function ServicesCtrl($scope,$http){
	console.log("Test ServiceCtrl");
	$scope.message = "Hello Message";
	/*Test Data*/
	/*STEP1*/
	/*
	var faqarray = [];
	
	var faq1 = {
		topickey: "What",
		userkey: "Aui",
	};
	var faq2 = {
		topickey: "When",
		userkey: "Unn",
	};
	var faq3 = {
		topickey: "Where",
		userkey: "Oil",
	};	
	
	faqarray = [faq1,faq2,faq3];

	$scope.faqarray = faqarray;
	*/

	/*Step2.3 formSubmit*/
	$scope.createFaq = function(){
		console.log($scope.faq);
		$http.post("/faqservice",$scope.faq).success(function(response){
			console.log(response);
		});
		$scope.getAll(); //Get Data
	};

	/*Step2*/
	var renderFaqs = function(response){
		$scope.faqarray = response;	
	};

	//Delete
	$scope.removeFaq = function(id){
		console.log(id);
		//$http.delete("/faqservice/"+id);
		$http.delete("/faqservice/"+id).success(function(){
			$scope.getAll();
		});  //callback
	};

	//Update
	$scope.updateFaq = function(){
		console.log($scope.faq);
		$http.put("/faqservice/"+$scope.faq._id,$scope.faq);
	}

	//Select
	$scope.selectFaq = function(id){
		console.log(id);
		$http.get("/faqservice/"+id).success(function(response){
			console.log(response);
			$scope.faq = response;
		});
	};

	//GET ALL
	//$http.get('/faqservice').success(renderFaqs); //put in function for crete to call
	$scope.getAll = function(){
		$http.get('/faqservice').success(renderFaqs);
	};
	
	$scope.getAll();

}

