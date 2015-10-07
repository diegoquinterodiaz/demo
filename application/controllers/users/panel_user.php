<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	/**
	* 
	*/
	class Panel_user extends CI_Controller
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
				$this->load->view('users/main');
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
	}
	?>