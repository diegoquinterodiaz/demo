<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	/**
	* 
	*/
	class Usuarios extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getUsuarios(){
			$query=$this->db->get('v_selectcmusuall');
			return $query;
		}

		public function getTip(){
			$query=$this->db->get('v_selectcmtipusu');
			return $query;
		}

		public function getUsu(){
			$query=$this->db->get('v_cmcolaborador2');
			return $query;
		}

		public function getUsuBox(){
			$query=$this->db->get('v_selectcombousu2');
			return $query;
		}

		public function addUsuario($data){
			$data['intentos']=0;
			$this->db->insert('cmusuario',$data);
		}

		public function editUsuario($data){
			$this->db->where('usuario',$data['usuario']);
			$data_aux=array(
				'codtipo'=>$data['codtipo'],
				'contrasena'=>$data['contrasena'],
				'descripcion'=>$data['descripcion'],
				'activo'=>$data['activo']	
			);
			$this->db->update('cmusuario',$data_aux);
		}

		public function getLider(){
			$query=$this->db->get('v_cmcolaborador2');
			return $query;
		}

		public function getDependiente($lider){
			$sql="SELECT cedula,nombre,apellidop,apellidos FROM v_cmcolaborador2 WHERE cedula != $lider";
			$query=$this->db->query($sql);
			return $query;
		}
		
	}
 ?>