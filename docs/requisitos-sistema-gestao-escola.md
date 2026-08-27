# Documento de Requisitos — Sistema de Gestão da Escola

## 1. Visão geral

O sistema será utilizado pela **administradora** para centralizar e facilitar o gerenciamento dos alunos, turmas, matrículas, pagamentos e informações financeiras do espaço.

O principal objetivo é substituir controles manuais e permitir que a administradora tenha uma visão clara da situação atual da escola.

---

# 2. Usuários do sistema

## 2.1 Administradora

A administradora será a principal usuária do sistema.

Ela poderá:

- Gerenciar alunos (adicionar, remover, vizualizar e editar).
- Realizar e consultar matrículas.
- Gerenciar turmas (adicionar, remover, vizualizar e editar).
- Visualizar alunos ativos e inativos.
- Registrar pagamentos.
- Adicionar, remover, vizualizar e editar pagamentos
- Consultar pagamentos pendentes.
- Visualizar arrecadação total.
- Visualizar arrecadação por turma.
- Gerenciar os pagamentos destinados às professoras.

---

# 3. Problemas que o sistema deve resolver

Atualmente existe dificuldade para obter rapidamente informações como:

- Quanto foi arrecadado no mês.
- Quanto foi gasto (aluguel, pagamentos para professoras e despesas).
- Quantos alunos estão ativos.
- Quantos alunos estão inativos.
- Quais alunos entraram recentemente.
- Quais alunos saíram.
- Quantos alunos existem em cada turma.
- Quais alunos já realizaram o pagamento mensal.
- Quais alunos ainda estão pendentes.
- Quanto cada turma arrecadou.
- Quanto deve ser pago para cada professora.

O sistema deverá centralizar essas informações em um único lugar.

---

# 4. Requisitos Funcionais

## RF01 — Cadastro de alunos

O sistema deverá permitir o cadastro de alunos.

### Adultos

Para alunos adultos, deverão ser armazenadas as seguintes informações:

- Nome completo.
- Data de nascimento.
- Número de telefone.

### Crianças

Para alunos menores de idade, deverão ser armazenadas:

- Nome completo da criança.
- Nome completo do responsável.
- Número de telefone do responsável.
- Data de nascimento da criança.

---

## RF02 — Matrícula

O sistema deverá permitir realizar a matrícula de um aluno em uma turma.

A matrícula deverá relacionar:

- Aluno.
- Turma.
- Data da matrícula.
- Situação da matrícula.

A situação poderá indicar, por exemplo:

- Ativo.
- Inativo.

---

## RF03 — Gerenciamento de turmas

O sistema deverá permitir visualizar e gerenciar as turmas existentes.

Para cada turma, deverá ser possível visualizar:

- Nome da turma.
- Professora responsável.
- Quantidade de alunos.
- Alunos matriculados.
- Situação da turma.

---

## RF04 — Controle de alunos ativos e inativos

O sistema deverá permitir identificar rapidamente:

- Quantidade de alunos ativos.
- Quantidade de alunos inativos.
- Quais alunos estão ativos.
- Quais alunos estão inativos.

O histórico deverá ser preservado para que seja possível saber quando um aluno entrou ou saiu.

---

<!-- ## RF05 — Controle de entrada e saída de alunos

O sistema deverá registrar as movimentações de alunos.

Deverá ser possível identificar:

- Data de entrada.
- Data de saída, quando aplicável.
- Turma em que o aluno estava matriculado.
- Motivo da saída, caso seja definido posteriormente.

--- -->

## RF06 — Controle de pagamentos dos alunos

O sistema deverá permitir registrar os pagamentos mensais dos alunos.

Para cada período de pagamento, deverá ser possível visualizar uma tabela contendo:

| Aluno   | Turma   | Status   | Data do pagamento |
| ------- | ------- | -------- | ----------------- |
| Aluno A | Turma 1 | Pago     | 05/08/2026        |
| Aluno B | Turma 1 | Pendente | —                 |
| Aluno C | Turma 2 | Pago     | 08/08/2026        |

O sistema deverá permitir identificar:

- Quem já pagou.
- Quem ainda não pagou.
- Data em que o pagamento foi realizado.
- Turma do aluno.
- Valor pago.

---

# 5. Controle financeiro

## RF07 — Arrecadação total

O sistema deverá apresentar a arrecadação total do espaço.

A administradora deverá conseguir consultar a arrecadação por período, principalmente mensalmente.

Exemplo:

**Agosto/2026**

- Arrecadação total: R$ 10.000,00
- Total recebido: R$ 9.000,00
- Total pendente: R$ 1.000,00

---

## RF08 — Arrecadação por turma

O sistema deverá permitir visualizar quanto cada turma arrecadou.

Exemplo:

| Turma   | Alunos | Arrecadação |
| ------- | -----: | ----------: |
| Turma A |     15 |    R$ 3.000 |
| Turma B |     12 |    R$ 2.400 |
| Turma C |     10 |    R$ 2.000 |

---

## RF09 — Controle de gastos

O sistema deverá permitir registrar os gastos do espaço.

Cada gasto poderá possuir:

- Descrição (opcional).
- Valor.
- Data.
- Categoria.
- Observação.

A partir desses dados, o sistema deverá permitir visualizar o total gasto em determinado período.

---

## RF10 — Resultado financeiro

O sistema deverá permitir visualizar o resultado financeiro do período.

De forma simplificada:

**Resultado = Arrecadação − Gastos**

Exemplo:

- Arrecadação: R$ 10.000
- Gastos: R$ 3.000
- Resultado: R$ 7.000

---

# 6. Pagamento das professoras

## RF11 — Controle de pagamentos das professoras

O sistema deverá permitir gerenciar os valores que precisam ser pagos às professoras.

Deverá ser possível visualizar:

- Professora.
- Turma relacionada.
- Valor a pagar.
- Período de referência.
- Status do pagamento.
- Data do pagamento.
- Gerar relatório em pdf.

Exemplo:

| Professora   | Turma   |    Valor | Status   |
| ------------ | ------- | -------: | -------- |
| Professora A | Turma 1 | R$ 1.500 | Pago     |
| Professora B | Turma 2 | R$ 1.200 | Pendente |

---

# 7. Dashboard

O sistema deverá possuir um dashboard inicial com uma visão geral da situação da escola.

Deverá apresentar informações como:

- Total de alunos ativos.
- Total de alunos inativos.
- Total de turmas.
- Alunos por turma.
- Arrecadação do mês.
- Gastos do mês.
- Resultado financeiro.
- Total de pagamentos pendentes.
- Total de pagamentos realizados.
- Valores pendentes para pagamento das professoras.

---

# 8. Requisitos Não Funcionais

## RNF01 — Responsividade

O sistema deverá ser responsivo e funcionar adequadamente em:

- Computadores.
- Tablets.
- Smartphones.

A interface deverá se adaptar aos diferentes tamanhos de tela.

---

## RNF02 — Performance

O sistema deverá apresentar bom tempo de resposta nas operações realizadas pela administradora.

Consultas comuns, como:

- Listagem de alunos.
- Consulta de pagamentos.
- Consulta de turmas.
- Visualização do dashboard.

deverão ser executadas de forma eficiente.

---

## RNF03 — Segurança

O sistema deverá proteger os dados armazenados.

Deverá possuir mecanismos como:

- Autenticação.
- Controle de acesso.
- Senhas armazenadas de forma segura.
- Validação dos dados recebidos.
- Proteção contra acessos não autorizados.
- Proteção das informações financeiras e pessoais dos alunos.

---

# 9. Informações que ainda precisam ser definidas

Para transformar esses requisitos em um sistema completo, ainda precisamos definir algumas regras de negócio.

## Alunos

- Um aluno pode estar em mais de uma turma?
- Uma criança pode ter mais de um responsável?
- O que significa exatamente "inativo"?
- O aluno pode voltar a ficar ativo depois de sair?
  d

## Pagamentos

- Qual é o valor mensal?
- O valor é igual para todas as turmas?
- Existe desconto?
- Existe multa ou juros por atraso?
- Qual é o dia de vencimento?
- O pagamento pode ser parcial?
- Quais formas de pagamento serão registradas?

## Professoras

- Como é calculado o valor que cada professora recebe?
- O pagamento é fixo ou depende da quantidade de alunos?
- Uma professora pode dar aula em várias turmas?
- Uma turma pode ter mais de uma professora?

## Financeiro

- Quais tipos de gastos existem?
- A administradora precisa registrar apenas gastos ou também outras receitas?
- Será necessário visualizar lucro por turma?
- Será necessário gerar relatórios ou exportar dados?

---

# 10. Objetivo do MVP

A primeira versão do sistema deverá priorizar:

1. Cadastro de alunos.
2. Cadastro e gerenciamento de turmas.
3. Matrículas.
4. Controle de alunos ativos e inativos.
5. Controle de pagamentos mensais.
6. Arrecadação por turma.
7. Arrecadação total.
8. Registro de gastos.
9. Controle de pagamento das professoras.
10. Dashboard com os principais indicadores.

Funcionalidades mais avançadas poderão ser adicionadas posteriormente conforme a necessidade da administradora.
