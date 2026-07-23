import { supabase } from './supabase';

// Generar código referral único
export const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Check y desbloquear badge si el usuario cumple requisito
export const checkAndUnlockBadges = async (userId: string) => {
  try {
    // Obtener stats del usuario
    const { data: stats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!stats) return;

    // Obtener todos los badges disponibles
    const { data: allBadges } = await supabase
      .from('badges')
      .select('*');

    if (!allBadges) return;

    // Obtener badges ya desbloqueados
    const { data: userBadges } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId);

    const unlockedBadgeIds = userBadges?.map(b => b.badge_id) || [];

    // Buscar badges nuevos a desbloquear
    for (const badge of allBadges) {
      if (unlockedBadgeIds.includes(badge.id)) continue;

      let shouldUnlock = false;

      switch (badge.category) {
        case 'quiz_completions':
          shouldUnlock = stats.total_quizzes >= badge.requirement;
          break;
        case 'referrals':
          shouldUnlock = stats.referrals_count >= badge.requirement;
          break;
        case 'quiz_performance':
          shouldUnlock = stats.average_score >= badge.requirement;
          break;
      }

      if (shouldUnlock) {
        // Desbloquear badge
        await supabase
          .from('user_badges')
          .insert({ user_id: userId, badge_id: badge.id });

        // Agregar puntos
        await supabase
          .from('user_stats')
          .update({ 
            badges_count: stats.badges_count + 1,
            total_points: (stats.total_points || 0) + 50 
          })
          .eq('user_id', userId);
      }
    }
  } catch (error) {
    console.error('[v0] Error checking badges:', error);
  }
};

// Actualizar streak
export const updateStreak = async (userId: string) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data: streak } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!streak) {
      // Crear nuevo streak
      await supabase.from('user_streaks').insert({
        user_id: userId,
        current_streak: 1,
        longest_streak: 1,
        last_quiz_date: today,
      });
      return;
    }

    const lastDate = streak.last_quiz_date;
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split('T')[0];

    let newStreak = streak.current_streak;

    if (lastDate === today) {
      // Ya completó hoy
      return;
    } else if (lastDate === yesterday) {
      // Streak continúa
      newStreak = streak.current_streak + 1;
    } else {
      // Streak se reinicia
      newStreak = 1;
    }

    const longestStreak = Math.max(newStreak, streak.longest_streak || 0);

    await supabase.from('user_streaks').update({
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_quiz_date: today,
    }).eq('user_id', userId);

  } catch (error) {
    console.error('[v0] Error updating streak:', error);
  }
};

// Procesar quiz completion
export const processQuizCompletion = async (
  userId: string,
  score: number,
  responses: any,
  emotionalLevel: string
) => {
  try {
    // Guardar intento
    await supabase.from('quiz_attempts').insert({
      user_id: userId,
      score,
      responses,
      emotional_level: emotionalLevel,
    });

    // Actualizar stats
    const { data: stats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (stats) {
      const newTotal = stats.total_quizzes + 1;
      const newAverage = (
        (stats.average_score * stats.total_quizzes + score) / newTotal
      ).toFixed(2);

      let masteryLevel = 'novice';
      if (newTotal >= 10 && parseFloat(newAverage) >= 80) {
        masteryLevel = 'expert';
      } else if (newTotal >= 5 && parseFloat(newAverage) >= 75) {
        masteryLevel = 'advanced';
      } else if (newTotal >= 3 && parseFloat(newAverage) >= 70) {
        masteryLevel = 'intermediate';
      }

      await supabase.from('user_stats').update({
        total_quizzes: newTotal,
        average_score: parseFloat(newAverage),
        total_points: (stats.total_points || 0) + Math.floor(score / 10),
        mastery_level: masteryLevel,
      }).eq('user_id', userId);
    }

    // Actualizar streak
    await updateStreak(userId);

    // Check badges
    await checkAndUnlockBadges(userId);

  } catch (error) {
    console.error('[v0] Error processing quiz:', error);
  }
};

// Procesar referral
export const processReferral = async (
  referralCode: string,
  newUserId: string
) => {
  try {
    const { data: referral } = await supabase
      .from('referrals')
      .select('referrer_id')
      .eq('referral_code', referralCode)
      .single();

    if (!referral) return;

    const referrerId = referral.referrer_id;

    // Actualizar referral como convertido
    await supabase
      .from('referrals')
      .update({
        referred_user_id: newUserId,
        converted_at: new Date().toISOString(),
        reward_points: 100,
      })
      .eq('referral_code', referralCode);

    // Actualizar stats del referrer
    const { data: referrerStats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', referrerId)
      .single();

    if (referrerStats) {
      await supabase.from('user_stats').update({
        referrals_count: referrerStats.referrals_count + 1,
        total_points: (referrerStats.total_points || 0) + 100,
      }).eq('user_id', referrerId);
    }

    // Check badges del referrer
    await checkAndUnlockBadges(referrerId);

  } catch (error) {
    console.error('[v0] Error processing referral:', error);
  }
};

// Obtener leaderboard
export const getLeaderboard = async (limit = 10) => {
  try {
    const { data } = await supabase
      .from('user_stats')
      .select(`
        user_id,
        total_points,
        total_quizzes,
        average_score,
        mastery_level,
        auth.users(id, email, user_metadata)
      `)
      .order('total_points', { ascending: false })
      .limit(limit);

    return data || [];
  } catch (error) {
    console.error('[v0] Error fetching leaderboard:', error);
    return [];
  }
};

// Obtener user badges
export const getUserBadges = async (userId: string) => {
  try {
    const { data } = await supabase
      .from('user_badges')
      .select(`
        id,
        unlocked_at,
        badges(id, name, description, icon, color)
      `)
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false });

    return data || [];
  } catch (error) {
    console.error('[v0] Error fetching badges:', error);
    return [];
  }
};

// Obtener user stats
export const getUserStats = async (userId: string) => {
  try {
    const { data } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    return data;
  } catch (error) {
    console.error('[v0] Error fetching user stats:', error);
    return null;
  }
};

// Obtener user streak
export const getUserStreak = async (userId: string) => {
  try {
    const { data } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    return data;
  } catch (error) {
    console.error('[v0] Error fetching streak:', error);
    return null;
  }
};

// Obtener referral info
export const getReferralInfo = async (userId: string) => {
  try {
    const { data: referral } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId)
      .single();

    const { data: conversions } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId)
      .not('referred_user_id', 'is', null);

    return {
      referralCode: referral?.referral_code || '',
      totalInvites: conversions?.length || 0,
      totalRewards: (conversions?.reduce((sum, r) => sum + (r.reward_points || 0), 0)) || 0,
    };
  } catch (error) {
    console.error('[v0] Error fetching referral info:', error);
    return { referralCode: '', totalInvites: 0, totalRewards: 0 };
  }
};
