<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class ExcepPeriodo extends CI_Controller
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
				$this->load->view('admin/excepperiodo');
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
			$this->load->model('ExcepPeriodos','obj',TRUE);
			$query=$this->obj->getExcepPeriodos();			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->periodo,					
					$tupla->colaborador,					
					$tupla->fecha,
					$tupla->observaciones);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$aux=explode("|",$this->input->post('periodo'));
			$data=array(
				'anno'=>$aux[0],
				'version'=>$aux[1],
				'cedula'=>$this->input->post('colaborador'),
				'fechacierre'=>$this->input->post('fechacierre'),							
				'observaciones'=>$this->input->post('observaciones')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

		public function add($data){
			$this->load->model('ExcepPeriodos','obj',TRUE);						
			try {				
				$this->obj->addExcepPeriodo($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}

		public function edit($data){
			$this->load->model('ExcepPeriodos','obj',TRUE);									
			try {				
				$this->obj->editExcepPeriodo($data);
				echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
			} catch (Exception $e) {
				echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
			}
		}
	}
 ?>