class WorkerMigration {

	constructor(record, year) {
		this.record = this.trimEverything(record);
		this.record.ano = year;
	}

	redefineValues() {

		let r = this.record;

		r.estado 										= this.toInt(!isNaN(r.municipio) ? r.municipio.substring(0,2) : null);
		r.municipio 								= this.toInt(r.municipio);
		r.cnae_95_classe 						=	this.toInt(r.cnae_95_classe);
		r.vinculo_ativo_3112 				=	this.toInt(r.vinculo_ativo_3112) === 1 ? true : false;
		r.tipo_vinculo 							=	this.transformTipoVinculo(r.tipo_vinculo);
		r.motivo_desligamento 			= this.toInt(r.motivo_desligamento);
		r.mes_desligamento					= this.toInt(r.mes_desligamento);
		r.ind_vinculo_alvara				= this.toInt(r.ind_vinculo_alvara);
		r.tipo_admissao							=	this.toInt(r.tipo_admissao);
		r.tipo_salario							= this.toInt(r.tipo_salario);
		r.cbo_94_ocupacao						= this.transformCBO(r.cbo_94_ocupacao);
		r.escolaridade_apos_2005		=	this.toInt(r.escolaridade_apos_2005);
		r.sexo_trabalhador					= this.transformSexo(r.sexo_trabalhador);
		r.nacionalidade							= this.toInt(r.nacionalidade);
		r.raca_cor									= this.toInt(r.raca_cor);
		r.ind_portador_defic				= this.toInt(r.ind_portador_defic) === 1 ? true : false;
		r.tamanho_estabelecimento		=	this.toInt(r.tamanho_estabelecimento);
		r.natureza_juridica					=	this.toInt(r.natureza_juridica);
		r.ind_cei_vinculado					= this.toInt(r.ind_cei_vinculado) === 1 ? true : false;
		r.tipo_estab								=	this.toInt(r.tipo_estab);
		r.ind_estab_participa_pat		=	this.toInt(r.ind_estab_participa_pat) === 1 ? true : false;
		r.ind_simples								= this.toInt(r.ind_simples) === 1 ? true : false;
		r.mes_admissao_declarada		=	this.transformMesAdmissao(r.data_admissao_declarada);
		r.data_admissao_declarada		=	this.transformDataAdmissao(r.data_admissao_declarada);
		r.vl_remun_media_nom				= this.toFloat(r.vl_remun_media_nom);
		r.vl_remun_media_sm					= this.toFloat(r.vl_remun_media_sm);
		r.vl_remun_dezembro_nom			= this.toFloat(r.vl_remun_dezembro_nom);
		r.vl_remun_dezembro_sm			= this.toFloat(r.vl_remun_dezembro_sm);
		r.tempo_emprego							= this.toFloat(r.tempo_emprego);
		r.qtd_hora_contr						= this.toInt(r.qtd_hora_contr);
		r.vl_ultima_remuneracao_ano	=	this.toFloat(r.vl_ultima_remuneracao_ano);
		r.vl_salario_contratual			= this.toFloat(r.vl_salario_contratual);
		r.pis												= this.pad('00000000000',	r.pis, true);
		r.numero_ctps								= this.pad('00000000000', r.numero_ctps, true);
		r.cpf												= this.pad('00000000000', r.cpf, true);
		r.dt_nascimento							= this.toDate(r.dt_nascimento);
		r.cei_vinculado							= r.cei_vinculado;
		r.cnpj_cei									= this.pad('00000000000000', r.cnpj_cei, true);
		r.cnpj_raiz									= r.cnpj_raiz;
		r.nome_trabalhador					= null;
		r.cbo_ocupacao_2002					= this.transformCBO(r.cbo_ocupacao_2002);
		r.cnae_2_classe							= r.cnae_2_classe;
		r.cnae_2_subclasse					= r.cnae_2_subclasse;
		r.tipo_defic								= this.toInt(r.tipo_defic);
		r.dia_desligamento					=	this.toInt(r.dia_desligamento);
		r.causa_afastamento_1				= this.transformAfastamento(r.causa_afastamento_1);
		r.dia_ini_af1								=	this.transformAfastamento(r.dia_ini_af1);
		r.mes_ini_af1								= this.transformAfastamento(r.mes_ini_af1);
		r.dia_fim_af1								=	this.transformAfastamento(r.dia_fim_af1);
		r.mes_fim_af1								=	this.transformAfastamento(r.mes_fim_af1);
		r.causa_afastamento_2				= this.transformAfastamento(r.causa_afastamento_2);
		r.dia_ini_af2								=	this.transformAfastamento(r.dia_ini_af2);
		r.mes_ini_af2								= this.transformAfastamento(r.mes_ini_af2);
		r.dia_fim_af2								=	this.transformAfastamento(r.dia_fim_af2);
		r.mes_fim_af2								=	this.transformAfastamento(r.mes_fim_af2);
		r.causa_afastamento_3				= this.transformAfastamento(r.causa_afastamento_3);
		r.dia_ini_af3								=	this.transformAfastamento(r.dia_ini_af3);
		r.mes_ini_af3								= this.transformAfastamento(r.mes_ini_af3);
		r.dia_fim_af3								=	this.transformAfastamento(r.dia_fim_af3);
		r.mes_fim_af3								=	this.transformAfastamento(r.mes_fim_af3);
		r.qtd_dias_afastamento			= this.transformAfastamento(r.qtd_dias_afastamento);
		r.idade											= this.transformAfastamento(r.idade);
		r.faixa_etaria							= this.toInt(r.faixa_etaria);
		r.ibge_subsetor							= this.transformAfastamento(r.ibge_subsetor);
		r.ibge_atividade						= this.transformAfastamento(r.ibge_atividade);

	}

	transformAfastamento(value) {

		if (value == '99' || value == 'IGNORADO') {
			return null;
		}

		return this.toInt(value);

	}

	transformDiaDesligamento(value) {

		if (!isNaN(value)) {
			return this.toInt(value);
		} else if (value == 'NÃO DESL ANO') {
			return 0;
		} else {
			return null;
		}


	}

	transformCNAEClasse(value) {

		if (value == null) return null;
	
		if (isNaN(value)) {
			value = this.toInt(value.replace('CLASSE', '').trim());
		} 

		return this.toInt(value);

	}

	transformCBO(value) {

		if (value == null) return null;

		if (isNaN(value)) {
			value = this.toInt(value.replace('CBO', '').trim());
		} 

		return this.toInt(value);

	}

	transformMesAdmissao(value) {

		if (value == null) {
			return null;
		} else if (value.length <= 2) {
			return this.toInt(value);
		} else {

			if (value.length == 7) {
				value = `0${value}`;
			}

			const fourLastChars = parseInt(value.substring(4,8));

			if (fourLastChars <= 2100 && fourLastChars > 1900) {
				// ddmmyyyy
				return this.toInt(value.substring(2,4));	
			} else {
				// yyyymmdd
				return this.toInt(value.substring(4,6));	
			}

		}

	}

	transformDataAdmissao(value) {
		
		if (value == null || value.length <= 2) {
			return null;
		} else {
			return this.toDate(value);
		}

	}

	transformSexo(value) {

		if (isNaN(value)) {
			switch(value) {
				case 'MASCULINO'	: return 1;
				case 'FEMININO' 	: return 2;
				default:
					return null;
			}
		}

		return this.toInt(value);

	}

	transformTipoVinculo(value) {

		if (!isNaN(value)) {
			return this.toInt(value);
		} 

		switch(value) {
			
			case 'CLT U/PJ IND' : return 10;
			case 'CLT U/PF IND' : return 15;
			case 'CLT R/PJ IND' : return 20;
			case 'CLT R/PF IND' : return 25;
			case 'ESTATUTARIO' 	: return 30;
			case 'ESTAT RGPS' 	: return 31; 
			case 'ESTAT N/EFET'	: return 35;
			case 'AVULSO'				: return 40;
			case 'TEMPORARIO' 	: return 50;
			case 'APREND CONTR'	: return 55;
			case 'CLT U/PJ DET'	: return 60;
			case 'CLT U/PF DET' : return 65;
			case 'CLT R/PJ DET'	: return 70;
			case 'CLT R/PF DET' : return 75;
			case 'DIRETOR' 			: return 80;
			case 'CONT PRZ DET'	: return 90;
			case 'CONT TMP DET' : return 95;
			case 'CONT LEI EST' : return 96;
			case 'CONT LEI MUN'	: return 97;
			default:
				return null;

		}

	}

	trimEverything(r) {

		Object.keys(r).forEach((key) => {
			r[key] = r[key].trim();
		});

		return r;

	}

	toInt(s) {
		if (s == null) return null;
		let i = parseInt(s);
		if (isNaN(i)) {
			return null;
		}
		return i;
	}

	toDate(s) {
		let i = this.toInt(s);
		if (i == null || isNaN(i)) return null;

		if (s.length == 7) {
			s = `0${s}`;
		}

		const fourLastChars = parseInt(s.substring(4,8));

		if (fourLastChars <= 2100 && fourLastChars > 1900) {
			// ddmmyyyy
			return new Date(s.substring(4,8), s.substring(2,4) - 1, s.substring(0,2));
		} else {
			// yyyymmdd
			return new Date(s.substring(0,4), s.substring(4,6) - 1, s.substring(6,8));
		}
		
	}

	toFloat(s) {
		if (s == null) return null;
		return parseFloat(s.replace(',', '.')).toFixed(2);
	}

	pad(pad, str, padLeft) {
	  
	  if (typeof str === 'undefined') 
	    return pad;
	  if (padLeft) {
	    return (pad + str).slice(-pad.length);
	  } else {
	    return (str + pad).substring(0, pad.length);
	  }

	}


	
}

module.exports = WorkerMigration;