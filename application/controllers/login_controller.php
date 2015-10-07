<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	/**
	* 
	*/
	class Login_controller extends CI_Controller
	{	
		private $state=0;

		function __construct(){
			parent::__construct();
			session_start();			
		}

		public function index(){
			//$this->session->sess_destroy();			
			session_destroy();						
			$this->load->helper('url');

			/*$config['protocol'] = 'smtp';
			$config['smtp_host'] = 'ssl://smtp.googlemail.com';
			$config['smtp_port'] = 465;
			$config['smtp_user'] = 'diegoquinterodiaz@gmail.com';
			$config['smtp_pass'] = 'esternocleidomastoideo121212';*/

			/* $this->load->library('email');			
			 $this->email->set_newline("\r\n");			
			 $this->email->from('diegoquinterodiaz@gmail.com', 'Diego Quintero');
			 $this->email->to('diegoquinterodiaz@gmail.com'); 
			 $this->email->cc('diegoquinterodiaz@gmail.com'); 
			 $this->email->bcc('diegoquinterodiaz@gmail.com'); 
			 $this->email->subject('Email Test');
			 $this->email->message('Testing the email class.');	
			 if($this->email->send())
			 {
			 	echo 'Your email was sent, successfully.';
			 }
			 else
			 {
			 	show_error($this->email->print_debugger());
			 }*/
			$this->load->view('templates/header');
			$this->load->view('login');
			$this->load->view('templates/footer');					

		}

		public function logIN(){
			//$this->load->library('session');
			$data=array('usr'=>$this->input->post('user'),'pss'=>$this->input->post('pss'));
			$this->load->model('Login','obj',TRUE);
			$query=$this->obj->findUser($data);			
			if ($query->num_rows()>0) {				
				foreach ($query->result() as $row) {			
					$_SESSION['parametros']=array(
						'usuario'=>$row->USUARIO,
						'cedula'=>$row->CEDULA,
						'codtipo'=>$row->CODTIPO
						);					
				}								
				$data= array('state' =>1,'tipo'=>$_SESSION['parametros']['codtipo']);
			}else{				
				$data=array('state'=>-1);
			}
			echo json_encode($data);											
		}
		
	}

	?>