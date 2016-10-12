-- Table: worker_migrations

-- DROP TABLE worker_migrations;

CREATE TABLE worker_migrations
(
  id serial NOT NULL,
  ano smallint,
  estado smallint,
  --
  municipio integer,
  cbo_ocupacao_2002 integer,
  --
  cnpj_raiz character varying(255),
  cpf character varying(255),
  --
  causa_afastamento_1 smallint,
  causa_afastamento_2 smallint,
  causa_afastamento_3 smallint,
  ind_portador_defic boolean,
  ind_simples boolean,
  --
  cnae_95_classe integer,
  data_admissao_declarada date,
  --
  dia_desligamento smallint,
  dia_fim_af1 smallint,
  dia_fim_af2 smallint,
  dia_fim_af3 smallint,
  --
  dia_ini_af1 smallint,
  dia_ini_af2 smallint,
  dia_ini_af3 smallint,
  faixa_etaria smallint,
  --
  escolaridade_apos_2005 integer,
  ibge_atividade smallint,
  ibge_subsetor smallint,
  --
  dt_nascimento date,
  idade smallint,
  ind_vinculo_alvara smallint,
  --
  mes_admissao_declarada smallint,
  mes_desligamento smallint,
  mes_fim_af1 smallint,
  mes_fim_af2 smallint,
  --
  mes_fim_af3 smallint,
  mes_ini_af1 smallint,
  mes_ini_af2 smallint,
  mes_ini_af3 smallint,
  --
  natureza_juridica smallint,
  qtd_dias_afastamento smallint,
  qtd_hora_contr smallint,
  raca_cor smallint,
  --
  sexo_trabalhador smallint,
  tamanho_estabelecimento smallint,
  tipo_defic smallint,
  tipo_estab smallint,
  --
  tipo_admissao smallint,
  tipo_salario smallint,
  tipo_vinculo smallint,
  ind_cei_vinculado boolean,
  ind_estab_participa_pat boolean,
  --
  cbo_94_ocupacao integer,
  motivo_desligamento smallint,
  nacionalidade smallint,
  --
  cei_vinculado character varying(255),
  cnae_2_classe character varying(255),
  cnae_2_subclasse character varying(255),
  cnpj_cei character varying(255),
  nome_trabalhador character varying(255),
  numero_ctps character varying(255),
  pis character varying(255),
  tempo_emprego numeric(12,4),
  vinculo_ativo_3112 boolean,
  vl_remun_dezembro_nom numeric(12,4),
  vl_remun_dezembro_sm numeric(12,4),
  vl_remun_media_nom numeric(12,4),
  vl_remun_media_sm numeric(12,4),
  vl_salario_contratual numeric(12,4),
  vl_ultima_remuneracao_ano numeric(12,4)
  
  CONSTRAINT worker_migrations_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE worker_migrations
  OWNER TO rais;