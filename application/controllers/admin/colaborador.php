<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class Colaborador extends CI_Controller
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
				$this->load->view('admin/colaborador');
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
			$this->load->model('Colaborador_model','obj',TRUE);
			$query=$this->obj->getColaborador();			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->cedula,
					$tupla->expcedula,
					$tupla->nombre,					
					$tupla->apellidop,
					$tupla->apellidos,
					$tupla->libretamil,
					$tupla->distritomil,
					$tupla->sexo,
					$tupla->estadocivil,
					$tupla->fechanacim,
					$tupla->paisnacim,
					$tupla->deptonacim,
					$tupla->ciudadnacim,
					$tupla->direccion,
					$tupla->barrio,
					$tupla->ciudadresid,
					$tupla->telefonoresid,
					$tupla->celular,
					$tupla->tipovivienda,
					$tupla->fechaingreso,
					$tupla->mailpersonal,
					$tupla->mailempresa,
					$tupla->salario,
					$tupla->codigo,
					$tupla->eps,
					$tupla->arp,
					$tupla->pension,
					$tupla->cesantias,
					$tupla->fecharetiro,
					$tupla->motivoretiro,
					$tupla->contratable,
					$tupla->activo
					);
				$i++;
			}

			echo json_encode($response);
		}

		public function selectGrid(){
			$this->load->model('Colaborador_model','obj',TRUE);
			$query=$this->obj->getColaboradorGrid();			
			$response=new stdClass();
			$response->total = 1;
			$response->page = 1;
			$response->records = $query->num_rows();
			$i=0;			
			foreach ($query->result() as $tupla) {
				$response->rows[$i]['id'] = $i;
				$response->rows[$i]['cell'] = array(
					$tupla->cedula,					
					strtoupper($tupla->nombre." ".$tupla->apellidop." ".$tupla->apellidos)					
				);
				$i++;
			}
			echo json_encode($response);
		}

		public function editData(){
			$data=array(
				'cedula'=>$this->input->post('cedula'),
				'expcedula'=>$this->input->post('expcedula'),
				'nombre'=>$this->input->post('nombre'),					
				'apellidop'=>$this->input->post('apellidop'),
				'apellidos'=>$this->input->post('apellidos'),
				'libretamil'=>$this->input->post('libretamil'),
				'distritomil'=>$this->input->post('distritomil'),
				'sexo'=>$this->input->post('sexo'),
				'estadocivil'=>$this->input->post('estadocivil'),
				'fechanacim'=>$this->input->post('fechanacim'),
				'paisnacim'=>$this->input->post('paisnacim'),
				'deptonacim'=>$this->input->post('deptonacim'),
				'ciudadnacim'=>$this->input->post('ciudadnacim'),
				'direccion'=>$this->input->post('direccion'),
				'barrio'=>$this->input->post('barrio'),
				'ciudadresid'=>$this->input->post('ciudadresid'),
				'telefonoresid'=>$this->input->post('telefonoresid'),
				'celular'=>$this->input->post('celular'),
				'tipovivienda'=>$this->input->post('tipovivienda'),
				'fechaingreso'=>$this->input->post('fechaingreso'),
				'mailpersonal'=>$this->input->post('mailpersonal'),
				'mailempresa'=>$this->input->post('mailempresa'),
				'salario'=>$this->input->post('salario'),
				'codigo'=>$this->input->post('codigo'),
				'eps'=>$this->input->post('eps'),
				'arp'=>$this->input->post('arp'),
				'pension'=>$this->input->post('pension'),
				'cesantias'=>$this->input->post('cesantias'),
				'fecharetiro'=>$this->input->post('fecharetiro'),
				'motivoretiro'=>$this->input->post('motivoretiro'),
				'contratable'=>$this->input->post('contratable'),
				'activo'=>$this->input->post('activo')
				);
			if($this->input->post('oper')=='add')
				$this->add($data);
			else
				$this->edit($data);			
		}

public function add($data){
	$this->load->model('Colaborador_model','obj',TRUE);						
	try {				
		$this->obj->addColaborador($data);
		echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
	} catch (Exception $e) {
		echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
	}
}

public function edit($data){
	$this->load->model('Colaborador_model','obj',TRUE);									
	try {				
		$this->obj->editColaborador($data);
		echo json_encode(array('state'=>TRUE,'msg'=>"Se registraron los datos correctamente"));				
	} catch (Exception $e) {
		echo json_encode(array('state'=>FALSE,'msg'=>$e->getMessage()));
	}
}

public function getColab(){
	$this->load->model('Colaborador_model','obj',TRUE);
	$query=$this->obj->getColab();
	foreach ($query->result() as $row) {
		$response[$row->cedula]= strtoupper($row->nombre.' '.$row->apellidop.' '.$row->apellidos);
	}						
	echo json_encode($response);			
}
}
?>