<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	/**
	* 
	*/
	class TipoEvaluador extends CI_Controller
	{
		
		function __construct()
		{
			parent::__construct();
			//$this->load->library('session');			
			session_start();
		}

		public function index(){
			$this->load->helper('url');
			if(isset($_SESSION['parametros'])){						
				$data['query']=$this->getMenuRoot();					
				$this->load->view('admin/index',$data);
				$this->load->view('admin/tipoevaluador');
			}else{
				redirect();
			}
		}

		public function getMenuRoot(){
			$this->load->model('Menu','obj',TRUE);
			$this->load->model('Login','obj',TRUE);
			$query=$this->obj->menuRoot();
			return $query;
		}

		public function select(){
			$this->load->model('TipoEvaluadores','obj',TRUE);
			$query=$this->obj->getTipoEvaluadores();			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->codigo,						
					$tupla->descripcion,					
					$tupla->activo);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'codigo'=>$this->input->post('codigo'),				
				'descripcion'=>$this->input->post('descripcion'),				
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('TipoEvaluadores','obj',TRUE);						
			try {				
				$this->obj->addTipoEvaluador($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('TipoEvaluadores','obj',TRUE);									
			try {				
				$this->obj->editTipoEvaluador($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function selectBox(){
			$an=$this->input->post('an');
			$vr=$this->input->post('vr');
			$cda=$this->input->post('cda');
			$this->load->model('TipoEvaluadores','obj',TRUE);
			$query=$this->obj->selectBox($an,$vr,$cda);
			$response[-1]="-- SELECCIONE --";									
			foreach ($query->result() as $row) {
				$response[$row->codigo]=$row->descripcion;
			}
			echo json_encode($response);
		}

		public function selectBox2(){			
			$this->load->model('TipoEvaluadores','obj',TRUE);
			$query=$this->obj->selectBox2();												
			foreach ($query->result() as $row) {
				$response[$row->codigo]=$row->descripcion;
			}
			echo json_encode($response);
		}
	}
 ?>