<?php 

	/**
	* 
	*/
	class Familias extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getFamilias($ced){
			$query=$this->db->get_where('v_cmfamilia',array('cedula'=>$ced));
			return $query;
		}

		public function add($data){
			if($data['activo']==2){
				$sql="DELETE FROM cmfamilia WHERE cedula='".$data['cedula']."'";
				$this->db->query($sql);
			}else{
				unset($data['activo']);
				$this->db->insert('cmfamilia',$data);
			}				
		}

		public function edit($data){
			if($data['activo']==2){
				$sql="DELETE FROM cmfamilia WHERE cedula='".$data['cedula']."' AND idfamiliar='".$data['idfamiliar']."'";
				$this->db->query($sql);
			}else{
				unset($data['activo']);
				$where=array(
					'cedula'=>$data['cedula'],
					'idfamiliar'=>$data['idfamiliar']
					);
				$this->db->where($where);
				unset($data['cedula']);
				$this->db->update('cmfamilia',$data);
			}
		}
	}
?>