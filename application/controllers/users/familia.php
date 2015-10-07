<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	/**
	* 
	*/
	class Familia extends CI_Controller
	{
		
		function __construct(){
			parent::__construct();
			session_start();			
		}
		
		public function index(){
			$this->load->helper('url');
			if(isset($_SESSION['parametros'])){						
				$data['query']=$this->getMenuUser($_SESSION['parametros']['usuario']);					
				$this->load->view('users/index',$data);
				$this->load->view('users/familia');
				$this->load->view('users/index2',$data);
			}else{
				redirect();
			}
		}

		public function getMenuUser($user){
			$this->load->model('Menu','obj',TRUE);
			//$this->load->model('Login','obj',TRUE);
			$query=$this->obj->menuUser($user);
			return $query;
		}

		public function select(){
			$this->load->model('Familias','obj',TRUE);
			$query=$this->obj->getFamilias($_SESSION['parametros']['cedula']);
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->idfamiliar,						
					$tupla->nombre,					
					$tupla->apellidop,
					$tupla->apellidos,
					$tupla->parentesco,
					$tupla->fechanacim,
					$tupla->ocupacion,
					'1');
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'cedula'=>$_SESSION['parametros']['cedula'],				
				'idfamiliar'=>$this->input->post('ced'),				
				'nombre'=>$this->input->post('nombre'),
				'apellidop'=>$this->input->post('apep'),
				'apellidos'=>$this->input->post('apes'),
				'parentesco'=>$this->input->post('paren'),
				'fechanacim'=>$this->input->post('fec'),
				'ocupacion'=>$this->input->post('ocu'),
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('Familias','obj',TRUE);						
			try {				
				$this->obj->add($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('Familias','obj',TRUE);									
			try {				
				$this->obj->edit($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}
	}
 ?>