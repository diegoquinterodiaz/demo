<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	/**
	* 
	*/
	class Modulo extends CI_Controller
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
				$this->load->view('admin/modulos');
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
			$this->load->model('Modulos','obj',TRUE);
			$query=$this->obj->getModulos();			
			$response= new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->md,
					$tupla->des,
					$tupla->ord,
					$tupla->act);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'modulo'=>$this->input->post('modulo'),
				'descripcion'=>$this->input->post('descripcion'),
				'orden'=>$this->input->post('orden'),
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('Modulos','obj',TRUE);						
			try {				
				$this->obj->addModulo($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('Modulos','obj',TRUE);									
			try {				
				$this->obj->editModulo($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function getMod(){
			$this->load->model('Modulos','obj',TRUE);
			$query=$this->obj->getMod();
			foreach ($query->result() as $row) {
				$response[$row->md]=$row->des;
			}
			echo json_encode($response);
		}		
	}
	?>