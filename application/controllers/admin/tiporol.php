<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	/**
	* 
	*/
	class TipoRol extends CI_Controller
	{
		
		function __construct()
		{
			parent::__construct();						
			session_start();
		}

		public function index(){
			$this->load->helper('url');
			if(isset($_SESSION['parametros'])){						
				$data['query']=$this->getMenuRoot();					
				$this->load->view('admin/index',$data);
				$this->load->view('admin/tiporol');
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
			$this->load->model('TipoRol_model','obj',TRUE);
			$query=$this->obj->getTipoRol();			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->codtiporol,
					$tupla->descripcion,					
					$tupla->activo);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'codtiporol'=>$this->input->post('codigo'),
				'descripcion'=>$this->input->post('descripcion'),				
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('TipoRol_model','obj',TRUE);						
			try {				
				$this->obj->addTipo($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('TipoRol_model','obj',TRUE);									
			try {				
				$this->obj->editTipo($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function getTipo(){
			$this->load->model('TipoRol_model','obj',TRUE);
			$query=$this->obj->getTipo();
			foreach ($query->result() as $row) {
				$response[$row->codtiporol]=$row->descripcion;
			}
			echo json_encode($response);
		}
	}
 ?>