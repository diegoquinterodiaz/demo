<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	/**
	* 
	*/
	class Periodo extends CI_Controller
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
				$this->load->view('admin/periodo');
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
			$this->load->model('Periodos','obj',TRUE);
			$query=$this->obj->getPeriodos();			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->anno,
					$tupla->version,						
					$tupla->descripcion,					
					$tupla->fechainicio,
					$tupla->fechacierre,
					$tupla->activo);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'anno'=>$this->input->post('ano'),
				'version'=>$this->input->post('version'),				
				'descripcion'=>$this->input->post('descripcion'),
				'fechainicio'=>$this->input->post('fecini'),
				'fechacierre'=>$this->input->post('fecfin'),				
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('Periodos','obj',TRUE);						
			try {				
				$this->obj->addPeriodo($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('Periodos','obj',TRUE);									
			try {				
				$this->obj->editPeriodo($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function getPeriodo(){
			$this->load->model('Periodos','obj',TRUE);
			$query=$this->obj->getPeriodo();									
			foreach ($query->result() as $row) {
				$response[$row->anno."|".$row->version]=$row->descripcion;
			}
			echo json_encode($response);
		}

		public function getPeriodo2(){
			$this->load->model('Periodos','obj',TRUE);
			$query=$this->obj->getPeriodo();									
			foreach ($query->result() as $row) {
				$response[$row->anno."-".$row->version]=$row->descripcion;
			}
			echo json_encode($response);
		}
	}
 ?>