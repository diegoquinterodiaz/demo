<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class Formato extends CI_Controller
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
				$this->load->view('admin/formato');
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
			$anno=$this->input->post('anno');
			$version=$this->input->post('version');
			$codarea=$this->input->post('codarea');
			$this->load->model('PesoCompetencias','obj',TRUE);
			$query=$this->obj->getPesoCompetencias($anno,$version,$codarea);			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->descripcion,
					$tupla->peso,
					$tupla->codcompetencia,
					$tupla->anno,
					$tupla->version,													
					$tupla->codarea,
					$tupla->requerido,
					$tupla->criticidad);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'anno'=>$this->input->post('anno'),				
				'version'=>$this->input->post('version'),				
				'codcompetencia'=>$this->input->post('codtipo'),
				'codarea'=>$this->input->post('codarea'),				
				'peso'=>$this->input->post('peso'),
				'requerido'=>$this->input->post('requerido'),
				'criticidad'=>$this->input->post('criticidad')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('PesoCompetencias','obj',TRUE);						
			try {				
				$this->obj->add($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('PesoCompetencias','obj',TRUE);									
			try {				
				$this->obj->edit($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

	}
 ?>