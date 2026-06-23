// auth.js - Módulo de autenticación
// BUG: no valida input null, lanza TypeError en producción

function validateUser(user) {
  // 🐛 BUG: si user es null/undefined, esto explota
  const email = user.email.trim().toLowerCase();
  const name = user.name.trim();

  if (!email.includes('@')) {
    return { valid: false, error: 'Email inválido' };
  }

  return { valid: true, email, name };
}

function authenticate(user, password) {
  const validation = validateUser(user);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // Simulación de auth
  if (password && password.length >= 8) {
    return { success: true, token: 'jwt-token-123' };
  }

  return { success: false, error: 'Contraseña inválida' };
}

module.exports = { validateUser, authenticate };
