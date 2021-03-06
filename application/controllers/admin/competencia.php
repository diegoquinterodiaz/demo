<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	/**
	* 
	*/
	class Competencia extends CI_Controller
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
				$this->load->view('admin/competencia');
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
			$this->load->model('Competencias','obj',TRUE);
			$query=$this->obj->getCompetencias();			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->codcompetencia,						
					$tupla->grupo,
					$tupla->descripcion,
					$tupla->observaciones,					
					$tupla->activo);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'codcompetencia'=>$this->input->post('codigo'),
				'codgrupocom'=>$this->input->post('grupo'),
				'descripcion'=>$this->input->post('descripcion'),								
				'observaciones'=>$this->input->post('observaciones'),
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('Competencias','obj',TRUE);						
			try {				
				$this->obj->addCompetencia($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('Competencias','obj',TRUE);									
			try {				
				$this->obj->editCompetencia($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function getCompetencia(){
			$this->load->model('Competencias','obj',TRUE);
			$query=$this->obj->getCompetencias();
			foreach ($query->result() as $row) {
				$response[$row->codcompetencia]=$row->descripcion;
			}
			echo json_encode($response);
		}
	}
 ?>