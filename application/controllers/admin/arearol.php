<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class AreaRol extends CI_Controller
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
				$this->load->view('admin/arearol');
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
			$this->load->model('AreaRoles','obj',TRUE);
			$query=$this->obj->getAreaRoles();			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->desarea,					
					$tupla->desrol,					
					$tupla->activo);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'codarea'=>$this->input->post('area'),
				'codrol'=>$this->input->post('rol'),							
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('AreaRoles','obj',TRUE);						
			try {				
				$this->obj->addAreaRol($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('AreaRoles','obj',TRUE);									
			try {				
				$this->obj->editAreaRol($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}
	}
	?>