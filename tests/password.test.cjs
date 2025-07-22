const { hashPassword } = require('../src/password/hashPassword');
const { comparePassword } = require('../src/password/comparePassword');

describe('Hash de senha', () => {
  const senha = 'senhaSegura123';

  it('deve gerar um hash e validar corretamente', async () => {
    const hash = await hashPassword(senha);
    expect(typeof hash).toBe('string');

    const isValid = await comparePassword(senha, hash);
    expect(isValid).toBe(true);
  });

  it('deve retornar falso para senha incorreta', async () => {
    const hash = await hashPassword(senha);
    const isValid = await comparePassword('senhaErrada', hash);
    expect(isValid).toBe(false);
  });
});
