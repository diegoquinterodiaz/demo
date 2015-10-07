<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class TipoEvaluadores extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getTipoEvaluadores(){
			$sql="SELECT codigo,descripcion,activo FROM cmtipoeval";
			$query=$this->db->query($sql);
			return $query;
		}

		public function addTipoEvaluador($data){
			$this->db->insert('cmtipoeval',$data);
		}

		public function editTipoEvaluador($data){
			$this->db->where('codigo',$data['codigo']);
			unset($data['codigo']);
			$this->db->update('cmtipoeval',$data);
		}

		public function selectBox($an,$vr,$cda){
			$sql="SELECT codigo,descripcion FROM cmtipoeval WHERE activo='1' AND codigo NOT IN (SELECT codtipoeval FROM cmpeso WHERE
                anno='$an' AND version='$vr' AND codarea='$cda') ORDER BY descripcion";
			$query=$this->db->query($sql);
			return $query;
		}

		public function selectBox2(){
			$sql="SELECT codigo,descripcion FROM cmtipoeval WHERE activo='1'";
			$query=$this->db->query($sql);
			return $query;
		}
	}
 ?>