<?php 
	/**
	* 
	*/
	class Colaborador_model extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getColaborador(){
			$sql="SELECT cedula,nombre,apellidop,apellidos,expcedula,libretamil,distritomil,sexo,estadocivil,
			fechanacim,paisnacim,deptonacim,ciudadnacim,direccion,barrio,ciudadresid,telefonoresid,celular,tipovivienda,
			fechaingreso,eps,arp,pension,cesantias,fecharetiro,motivoretiro,contratable,mailpersonal,activo,mailempresa,
			salario,codigo,foto FROM cmcolaborador";
			$query=$this->db->query($sql);
			return $query;
		}

		public function getColaboradorGrid(){
			$sql="SELECT cedula,nombre,apellidop,apellidos FROM cmcolaborador WHERE activo='1'";
			$query=$this->db->query($sql);
			return $query;
		}

		public function addColaborador($data){
			$this->db->insert('cmcolaborador',$data);
		}

		public function editColaborador($data){
			$this->db->where('cedula',$data['cedula']);
			unset($data['cedula']);
			$this->db->update('cmcolaborador',$data);
		}

		public function getColab(){
			$query=$this->db->get('v_cmcolaborador2');
			return $query;
		}
	}
 ?>