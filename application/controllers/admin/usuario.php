<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	/**
	* 
	*/
	class Usuario extends CI_Controller
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
				$this->load->view('admin/usuario');
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
			$this->load->model('Usuarios','obj',TRUE);
			$query=$this->obj->getUsuarios();
			$response=new stdClass();			
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(					
					$tupla->codtipo,
					$tupla->nombre,
					$tupla->usuario,					
					$tupla->contrasena,
					$tupla->contrasena,	
					$tupla->descripcion,
					$tupla->activo
					);
				$i++;
			}
			echo json_encode($response);
		}

		public	function getTip(){
			$this->load->model('Usuarios','obj',TRUE);
			$query=$this->obj->getTip();
			foreach ($query->result() as $row) {
				$response[$row->codtipo]=$row->tipo;
			}
			echo json_encode($response);
		}

		public	function getUsu(){
			$this->load->model('Usuarios','obj',TRUE);
			$query=$this->obj->getUsu();
			foreach ($query->result() as $row) {
				$response[$row->cedula]=$row->nombre." ".$row->apellidop." ".$row->apellidos;
			}
			echo json_encode($response);
		}

		public function getUsuBox(){
			$this->load->model('Usuarios','obj',TRUE);
			$query=$this->obj->getUsuBox();
			foreach ($query->result() as $row) {
				$response[$row->usuario]=$row->usuario;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'usuario'=>$this->input->post('usuario'),
				'codtipo'=>$this->input->post('tipo'),				
				'cedula'=>$this->input->post('persona'),
				'contrasena'=>$this->input->post('clave1'),
				'descripcion'=>$this->input->post('descripcion'),				
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('Usuarios','obj',TRUE);						
			try {				
				$this->obj->addUsuario($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('Usuarios','obj',TRUE);									
			try {				
				$this->obj->editUsuario($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public	function getLider(){
			$this->load->model('Usuarios','obj',TRUE);
			$query=$this->obj->getLider();
			$response[0]="-- SELECCIONE --";			
			foreach ($query->result() as $row) {
				$response[$row->cedula]=$row->nombre." ".$row->apellidop." ".$row->apellidos;
			}
			echo json_encode($response);
		}

		public function getDependiente(){
			$this->load->model('Usuarios','obj',TRUE);
			$lider=$this->input->post('lider');
			$query=$this->obj->getDependiente($lider);
			foreach ($query->result() as $row) {
				$response[$row->cedula]=$row->nombre." ".$row->apellidop." ".$row->apellidos;
			}
			echo json_encode($response);
		}
	}
 ?>