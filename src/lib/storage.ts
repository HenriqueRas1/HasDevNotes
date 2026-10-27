/**
 * Leitura e escrita de JSON no localStorage.
 *
 * O localStorage só guarda texto, então convertemos com JSON.stringify e
 * JSON.parse. Todas as chaves ganham o prefixo "hasdevnotes:" para não
 * colidir com outros dados do mesmo endereço (ex.: localhost:5173).
 */

const PREFIX = 'hasdevnotes:'

/**
 * Lê e converte um valor. Retorna `null` se a chave não existir, se o JSON
 * estiver corrompido ou se o navegador bloquear o acesso (modo privado,
 * cookies desativados…).
 *
 * O retorno é `unknown` de propósito: dados salvos podem ter sido editados à
 * mão ou estar num formato antigo, então quem chama precisa validar.
 */
export function readJSON(key: string): unknown {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw === null ? null : JSON.parse(raw)
  } catch {
    return null
  }
}

/**
 * Salva um valor. Pode lançar erro se o armazenamento estiver cheio ou
 * bloqueado; quem chama decide o que fazer.
 */
export function writeJSON(key: string, value: unknown): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value))
}
