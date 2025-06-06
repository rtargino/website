# AutomatedCV

Link do website: [Currículo - Rodrigo S. Targino](https://rtargino.github.io/website/)

# Projeto de Desenvolvimento de Software - AutomatedCV

Esse projeto tem como objetivo a criação de uma ferramenta automatizada para gestão e exibição de conquistas acadêmicas. A ferramenta será hospedada em um repositório no GitHub devidamente modularizada e acompanhada por uma documentação completa.

## Estrutura de Arquivos

A estrutura de arquivos do projeto é a seguinte:

```bash
website/ (root)
│   ├───.gitignore                      # Arquivos e pastas a serem ignorados pelo Git
│   ├───index.html                      # Página inicial da interface web
│   ├───LICENSE                         # Licença do projeto (Padrão Apache 2.0)
│   ├───README.md                       # Documentação do projeto (este arquivo)
│   ├───search_page.html                # Página de busca de publicações na interface web
│   └───updateCV.sh                     # Script para atualização automática do CV
│   
├───src                                 # Código fonte da ferramenta de automação
│   ├───bibtex_processor.py             # Módulo para processar arquivos BibTeX
│   ├───requirements.txt                # Dependências do projeto
│   ├───RodrigoSTarginoCV_short.pdf     # Versão curta do currículo em PDF
│   ├───RodrigoSTarginoCV_short.Rmd     # Arquivo fonte R Markdown para geração do CV curto
│   └───__init__.py                     # Arquivo de inicialização do pacote
│
├───static                              # Conteúdo estático, incluindo arquivos BibTeX, JSON e CSV
│   ├───author_data                     # Dados pessoais do autor
│   │   ├───awards.csv                  # Prêmios e distinções
│   │   ├───editorial.csv               # Atividades editoriais
│   │   ├───education.csv               # Formação acadêmica
│   │   ├───grants.csv                  # Bolsas e financiamentos recebidos
│   │   ├───personal_data.json          # Informações pessoais do autor
│   │   ├───professional_experience.csv # Experiências profissionais e acadêmicas
│   │   ├───RodrigoSTarginoCV.pdf       # Currículo completo em PDF
│   │   ├───RodrigoSTarginoCV_short.pdf # Versão curta do currículo em PDF
│   │   ├───students.csv                # Lista de alunos orientados
│   │   ├───teaching_experience.csv     # Experiências de ensino
│   │   └───visits.csv                  # Visitas acadêmicas
│   │
│   ├───autogenerated_files             # Arquivos gerados automaticamente para exibição no site
│   │   ├───individual_bib_files        # Arquivos BibTeX individuais
│   │   │   ├───in_preparation          # Artigos em preparação
│   │   │   ├───preprints               # Preprints (artigos não publicados)
│   │   │   ├───publications            # Publicações
│   │   │   ├───talks                   # Seminários e palestras
│   │   │   └───thesis                  # Teses
│   │   └───json_files                  # Arquivos JSON para exibição no website
│   │       ├───in_preparation.json     # JSON dos artigos em preparação
│   │       ├───preprints.json          # JSON dos preprints
│   │       ├───publications.json       # JSON das publicações
│   │       ├───talks.json              # JSON dos seminários
│   │       └───thesis.json             # JSON das teses
│   │
│   ├───bib_files                       # Arquivos BibTeX completos
│   │   ├───in_preparation.bib          # Artigos em preparação
│   │   ├───preprints.bib               # Preprints
│   │   ├───publications.bib            # Publicações
│   │   ├───talks.bib                   # Seminários e palestras
│   │   └───thesis.bib                  # Teses
│   │
│   └───images                          # Imagens usadas no CV e no site
│       ├───favicon.png                 # Ícone do site
│       └───profile_picture.jpg         # Foto de perfil do autor
│           
└───website                             # Código fonte do website (HTML, CSS, JS)
    ├───css                             # Estilos do website
    │   └───styles.css                  # Arquivo CSS principal
    └───js                              # Scripts do website
        ├───main.js                     # Script principal
        ├───search_page.js              # Script para busca de publicações
        └───utils.js                    # Funções utilitárias

```

## Como a Ferramenta AutomatedCV Funciona

### Objetivo

A ferramenta AutomatedCV foi desenvolvida para facilitar a gestão e exibição de conquistas acadêmicas de forma automatizada. O objetivo principal é permitir que pesquisadores e acadêmicos mantenham seus currículos atualizados com o mínimo de esforço, utilizando arquivos BibTeX para gerenciar publicações e outras realizações acadêmicas.

### Pipeline de Dados

1. **Entrada de Dados**: O usuário insere suas informações acadêmicas em arquivos BibTeX, CSV e JSON. Esses arquivos são organizados em diretórios específicos dentro da pasta `static`.

2. **Processamento de Dados**: O módulo `bibtex_processor.py` é responsável por processar os arquivos BibTeX, segmentando as referências e convertendo-as em formatos universais (JSON).

3. **Geração de Currículo**: Utilizando arquivos R Markdown (`RodrigoSTarginoCV.Rmd` e `RodrigoSTarginoCV_short.Rmd`), a ferramenta gera versões completas e curtas do currículo em PDF.

4. **Atualização Automática**: O script `updateCV.sh` automatiza a atualização do currículo, instalando bibliotecas necessárias, processando novos dados e regenerando os PDFs.

5. **Exibição na Web**: As informações processadas são exibidas em uma página web hospedada no GitHub Pages. A estrutura do site é gerida por arquivos HTML, CSS e JavaScript localizados na pasta `website`.

### Tutorial: Como Atualizar o Currículo

1. **Atualize os Arquivos de Dados**:
    - Adicione ou modifique suas informações acadêmicas nos arquivos CSV, JSON e BibTeX dentro da pasta `static`.
    - As fontes de inserção são os arquivos na pasta `static/author_data` e os arquivos BibTeX na pasta `static/bib_files`.
    
        - `static/author_data`:
            - `awards.csv`: Prêmios e distinções recebidos.
            - `editorial.csv`: Atividades editoriais realizadas.
            - `education.csv`: Formação acadêmica.
            - `grants.csv`: Bolsas e financiamentos recebidos.
            - `personal_data.json`: Informações pessoais do autor.
            - `professional_experience.csv`¹: Experiências profissionais e acadêmicas.
            - `students.csv`: Lista de alunos orientados.
            - `teaching_experience.csv`: Experiências de ensino.
            - `visits.csv`: Visitas acadêmicas realizadas.
        - `static/bib_files`:
            - `in_preparation.bib`: Artigos em preparação.
            - `preprints.bib`: Preprints (artigos não publicados).
            - `publications.bib`: Publicações.
            - `talks.bib`: Seminários e palestras.
            - `thesis.bib`: Teses.
    
    > **Atenção**: Mantenha a formatação correta dos arquivos para garantir que os dados sejam processados corretamente.

    > (1) O arquivo `professional_experience.csv` permite apontar o cargo atual, não demarcando uma data de término.

2. **Execute o Script de Atualização**:
    - Navegue até o diretório raiz do projeto e execute o script `updateCVfiles.sh` para processar os novos dados e atualizar os PDFs do currículo.

    ```bash
    ./updateCVfiles.sh
    ```

3. **Verifique os Arquivos Gerados**:
    - Certifique-se de que os arquivos `RodrigoSTarginoCV.pdf` e `RodrigoSTarginoCV_short.pdf` foram atualizados corretamente na pasta `static/author_data`.

4. **Atualize o Site**:
    - Add, Commit e Push das mudanças para o repositório GitHub para que o site seja atualizado automaticamente no GitHub Pages. Para isso, execute manualmente os comandos ou invoque o arquivo `updateWebsite.sh`:

    ```bash
    ./updateWebsite.sh
    ```

    - Uma vez atualizado, as mudanças ficam disponíveis em, aproximadamente, 2 min no site.

5. **Documente as Mudanças**:
    - Atualize a documentação do projeto (`README.md`) para refletir quaisquer mudanças significativas na estrutura ou no processo de atualização.

Seguindo esses passos, você garantirá que seu currículo esteja sempre atualizado e disponível tanto em formato PDF quanto na web.