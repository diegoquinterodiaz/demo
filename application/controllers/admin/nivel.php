<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	/**
	* 
	*/
	class Nivel extends CI_Controller
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
				$this->load->view('admin/nivel');
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
			$this->load->model('Niveles','obj',TRUE);
			$query=$this->obj->getNiveles();			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->codnivel,						
					$tupla->descripcion,					
					$tupla->observacion,
					$tupla->activo);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'codnivel'=>$this->input->post('codigo'),				
				'descripcion'=>$this->input->post('descripcion'),				
				'observacion'=>$this->input->post('observaciones'),				
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('Niveles','obj',TRUE);						
			try {				
				$this->obj->addNivel($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('Niveles','obj',TRUE);									
			try {				
				$this->obj->editNivel($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function getNivel(){
			$this->load->model('Niveles','obj',TRUE);									
			$query=$this->obj->getNivel();
			foreach ($query->result() as $row) {
				$response[$row->codnivel]=$row->descripcion;
			}
			echo json_encode($response);
		}
	}
 ?>