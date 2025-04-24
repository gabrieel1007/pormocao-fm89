# 📢 Sistema de Cadastro de Promoções

Este projeto oferece uma interface para cadastrar promoções e visualizar os registros de forma organizada.

## ✨ Funcionalidades

- ✅ **Cadastro de promoções**
- 📋 **Visualização de todas as promoções cadastradas**
- 💾 **Armazenamento local** utilizando banco de dados
- 🧾 **Validação de dados**

## 🛠 Tecnologias Utilizadas

- **Next.js** — Framework React para aplicações web modernas
- **Prisma** — ORM para interação com banco de dados
- **TypeScript** — Superset do JavaScript com tipagem estática
- **MariaDB** — Banco de dados relacional
- **Zod** — Biblioteca de validação de esquemas TypeScript-first

---

## 📋 Checklist de Funcionalidades

### 📥 Formulário de Cadastro de Promoção

- [x] Input para upload do **Banner** (imagem - formatos comuns)
- [x] Validação: tipo e tamanho do **arquivo de imagem**
- [x] Implementar **preview da imagem** após upload
- [x] Campo de **Título** (obrigatório)
- [x] Campo de **Link** (URL válida iniciando com `http://` ou `https://`)
- [x] Campo de **Descrição** (obrigatório)
- [x] Input de **Data de Início** (obrigatório, menor que a data de encerramento)
- [x] Input de **Data de Encerramento** (obrigatório, maior que a data de início)
- [x] Exibir **mensagens de erro** nos campos inválidos

### ⚙️ Backend & Persistência

- [x] Criar **server action** para receber os dados do formulário
- [x] Armazenar o **banner e dados da promoção**
- [x] Persistir os dados em **banco de dados MariaDB usando Prisma**

### 🖼️ Página de Listagem de Promoções

- [ ] Criar página com **lista de promoções cadastradas**
- [ ] Exibir **banner**, **título** e **período** da promoção

### 🎨 Estilização e Experiência do Usuário

- [ ] Aplicar **TailwindCSS v4** no formulário e listagem
- [ ] Melhorar **UI/UX** com responsividade e feedback visual nos erros

### 🧪 Testes Manuais

- [x] Testar **upload e preview da imagem**
- [x] Testar **validações dos campos**
- [x] Testar **submissão do formulário**
- [ ] Testar **exibição das promoções cadastradas**
