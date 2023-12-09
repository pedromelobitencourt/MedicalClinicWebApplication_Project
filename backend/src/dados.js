const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Preencher a tabela BaseDeEnderecos
  const enderecos = await prisma.baseDeEnderecos.createMany({
    data: [
      { cep: '12345678', logradouro: 'Rua A', bairro: 'Bairro 1', cidade: 'Cidade 1', estado: 'Estado 1' },
      { cep: '23456789', logradouro: 'Rua B', bairro: 'Bairro 2', cidade: 'Cidade 2', estado: 'Estado 2' },
      { cep: '34567890', logradouro: 'Rua C', bairro: 'Bairro 3', cidade: 'Cidade 3', estado: 'Estado 3' },
      { cep: '45678901', logradouro: 'Rua D', bairro: 'Bairro 4', cidade: 'Cidade 4', estado: 'Estado 4' },
      { cep: '56789012', logradouro: 'Rua E', bairro: 'Bairro 5', cidade: 'Cidade 5', estado: 'Estado 5' },
    ],
  });

  // Preencher a tabela Pessoa
  const pessoas = await prisma.pessoa.createMany({
    data: [
      { name: 'Nome Pessoa 1', email: 'pessoa1@example.com', telefone: '123456789', enderecoId: enderecos[0].id },
      { name: 'Nome Pessoa 2', email: 'pessoa2@example.com', telefone: '234567890', enderecoId: enderecos[1].id },
      { name: 'Nome Pessoa 3', email: 'pessoa3@example.com', telefone: '345678901', enderecoId: enderecos[2].id },
      { name: 'Nome Pessoa 4', email: 'pessoa4@example.com', telefone: '456789012', enderecoId: enderecos[3].id },
      { name: 'Nome Pessoa 5', email: 'pessoa5@example.com', telefone: '567890123', enderecoId: enderecos[4].id },
    ],
  });

  // Preencher a tabela Funcionario
  const funcionarios = await prisma.funcionario.createMany({
    data: [
      { dataContrato: new Date(), salario: 5000.00, pessoaId: pessoas[0].id },
      { dataContrato: new Date(), salario: 5500.00, pessoaId: pessoas[1].id },
      { dataContrato: new Date(), salario: 6000.00, pessoaId: pessoas[2].id },
      { dataContrato: new Date(), salario: 6500.00, pessoaId: pessoas[3].id },
      { dataContrato: new Date(), salario: 7000.00, pessoaId: pessoas[4].id },
    ],
  });

  // Preencher a tabela Medico
  const medicos = await prisma.medico.createMany({
    data: [
      { crm: '12345', especialidade: 'Cardiologia', funcionarioId: funcionarios[0].id },
      { crm: '23456', especialidade: 'Ortopedia', funcionarioId: funcionarios[1].id },
      { crm: '34567', especialidade: 'Dermatologia', funcionarioId: funcionarios[2].id },
      { crm: '45678', especialidade: 'Pediatria', funcionarioId: funcionarios[3].id },
      { crm: '56789', especialidade: 'Ginecologia', funcionarioId: funcionarios[4].id },
    ],
  });

  // Preencher a tabela Paciente
  const pacientes = await prisma.paciente.createMany({
    data: [
      { peso: 70.5, altura: 1.75, tipoSanguineo: 'A+', pessoaId: pessoas[0].id },
      { peso: 65.0, altura: 1.70, tipoSanguineo: 'B+', pessoaId: pessoas[1].id },
      { peso: 80.0, altura: 1.80, tipoSanguineo: 'O-', pessoaId: pessoas[2].id },
      { peso: 55.0, altura: 1.60, tipoSanguineo: 'AB+', pessoaId: pessoas[3].id },
      { peso: 72.5, altura: 1.78, tipoSanguineo: 'A-', pessoaId: pessoas[4].id },
    ],
  });

  // Preencher a tabela ProntuarioEletronico
  const prontuarios = await prisma.prontuarioEletronico.createMany({
    data: [
      { anamnese: 'História clínica do paciente 1', medicamentos: 'Lista de medicamentos 1', atestados: 'Lista de atestados 1', pacienteId: pacientes[0].id },
      { anamnese: 'História clínica do paciente 2', medicamentos: 'Lista de medicamentos 2', atestados: 'Lista de atestados 2', pacienteId: pacientes[1].id },
      { anamnese: 'História clínica do paciente 3', medicamentos: 'Lista de medicamentos 3', atestados: 'Lista de atestados 3', pacienteId: pacientes[2].id },
      { anamnese: 'História clínica do paciente 4', medicamentos: 'Lista de medicamentos 4', atestados: 'Lista de atestados 4', pacienteId: pacientes[3].id },
      { anamnese: 'História clínica do paciente 5', medicamentos: 'Lista de medicamentos 5', atestados: 'Lista de atestados 5', pacienteId: pacientes[4].id },
    ],
  });

  // Preencher a tabela Agenda
  const agendas = await prisma.agenda.createMany({
    data: [
      { data: new Date(), horario: '14:00', name: 'Consulta 1', email: 'consulta1@example.com', medicoId: medicos[0].id },
      { data: new Date(), horario: '15:30', name: 'Consulta 2', email: 'consulta2@example.com', medicoId: medicos[1].id },
      { data: new Date(), horario: '17:00', name: 'Consulta 3', email: 'consulta3@example.com', medicoId: medicos[2].id },
      { data: new Date(), horario: '09:00', name: 'Consulta 4', email: 'consulta4@example.com', medicoId: medicos[3].id },
      { data: new Date(), horario: '10:30', name: 'Consulta 5', email: 'consulta5@example.com', medicoId: medicos[4].id },
    ],
  });

  console.log('Dados inseridos com sucesso!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });