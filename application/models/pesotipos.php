<?php 

	/**
	* 
	*/
	class PesoTipos extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getPesoTipos($anno,$version,$codarea){
			$sql="SELECT tp.descripcion,p.peso,tp.codigo,p.anno,p.version,p.codarea FROM cmpeso p,cmtipoeval tp
			WHERE tp.activo='1' AND p.anno='$anno' AND p.version='$version' AND p.codarea='$codarea' AND tp.codigo=p.codtipoeval
			GROUP BY tp.descripcion,p.peso,p.codtipoeval,p.anno,p.version,p.codarea ORDER BY tp.descripcion";
			$query=$this->db->query($sql);
			return $query;
		}
	}
	?>