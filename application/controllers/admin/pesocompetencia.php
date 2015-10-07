<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class PesoCompetencia extends CI_Controller
	{
		
		function __construct()
		{
			parent::__construct();
			//$this->load->library('session');			
			session_start();
		}

		public function selectBox(){
			$anno=$this->input->post('an');
			$version=$this->input->post('vr');
			$codarea=$this->input->post('cda');
			$this->load->model('PesoCompetencias','obj',TRUE);
			$query=$this->obj->selectBox($anno,$version,$codarea);
			$response[-1]="-- SELECCIONE --";
			foreach ($query->result() as $row) {
				$response[$row->codcompetencia]=$row->descripcion;
			}
			echo json_encode($response);
		}		
	}
	?>