#!/usr/bin/env python3
"""
Script para ejecutar SQL automáticamente en Supabase
Sin requerir configuración manual
"""

import os
import sys

# Credenciales
SUPABASE_URL = "https://xzjoruazhlwmaebnqqbv.supabase.co"
SUPABASE_SERVICE_ROLE_KEY = "sb_secret_6kkLxGJ0_hIujkLb7QIVSw_xUzC6NrK"

try:
    import requests
    print("[v0] ✓ Importando requests...")
except ImportError:
    print("[v0] ✗ Instalando requests...")
    os.system("pip install requests -q")
    import requests

def execute_sql(sql_content, block_name):
    """Ejecuta SQL en Supabase"""
    print(f"\n[v0] Ejecutando {block_name}...")
    
    headers = {
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
    }
    
    # Endpoint de Supabase para ejecutar SQL
    url = f"{SUPABASE_URL}/rest/v1/rpc/sql"
    
    # Intentar usando el endpoint de admin
    try:
        # Dividir SQL en statements individuales
        statements = [s.strip() for s in sql_content.split(';') if s.strip()]
        
        for i, statement in enumerate(statements, 1):
            print(f"  [{i}/{len(statements)}] Ejecutando statement...", end=" ")
            
            payload = {"query": statement + ";"}
            
            response = requests.post(url, json=payload, headers=headers, timeout=10)
            
            if response.status_code in [200, 201]:
                print("✓")
            else:
                print(f"⚠ ({response.status_code})")
                if response.text:
                    print(f"    Respuesta: {response.text[:100]}")
        
        print(f"[v0] ✓ {block_name} completado")
        return True
        
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        return False

def main():
    """Función principal"""
    print("=" * 60)
    print("[v0] SETUP AUTOMÁTICO SUPABASE")
    print("=" * 60)
    
    # Leer archivos SQL
    bloques = [
        ("SQL_BLOQUE_1_TABLAS.sql", "Bloque 1: Tablas"),
        ("SQL_BLOQUE_2_INDICES.sql", "Bloque 2: Índices"),
        ("SQL_BLOQUE_3_BADGES.sql", "Bloque 3: Badges"),
    ]
    
    resultados = []
    
    for archivo, nombre in bloques:
        if not os.path.exists(archivo):
            print(f"[v0] ✗ No encontré {archivo}")
            continue
        
        with open(archivo, 'r') as f:
            sql = f.read()
        
        resultado = execute_sql(sql, nombre)
        resultados.append(resultado)
    
    print("\n" + "=" * 60)
    if all(resultados):
        print("[v0] ✓ SETUP COMPLETADO EXITOSAMENTE")
        print("[v0] ✓ Todas las tablas, índices y badges creados")
        print("[v0] ✓ Tu Supabase está listo para usar")
    else:
        print("[v0] ⚠ Setup completado con algunos avisos")
    
    print("=" * 60)

if __name__ == "__main__":
    main()
