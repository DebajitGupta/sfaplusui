(function () {
    'use strict'
    angular
        .module('app')
        .controller('SubscibtionModelCtrl', ['$scope', 'SubscibtionModelSrvc', function ($scope, SubscibtionModelSrvc) {

            $scope.dataParam = {
                ModelName: '',
                CustomerUser: '',
                CustUserCost: '',
                OthrUserCost: '',
                EmployeeUser: '',
                VendorUser: '',
                EmpUserCost: '',
                EffectiveDate: '',
                InfluencerUser: '',
                OtherUser: '',
                VendorUserCost: '',
                InfluencerCost: '',
                Active: '1',  
                UserId:'1',
            };
            $scope.CustDAta = [];
            $scope.TempDAta = [];
            $scope.Successjs = 'd-none';
            $scope.Successmsg = '';
            $scope.Errorjs = 'd-none';
            $scope.Errormsg = '';

            $scope.addSubscriptionData = function (modelName, customerUser, custUserCost, OthrUserCost, EmployeeUser, VendorUser, EmpUserCost, EffectiveDate, InfluencerUser, InfluencerCost, OtherUser, VendorUserCost, Active) {
                var Errormsg = [];
                if (!modelName) {
                    var msg = 'Model Name Can not be empty..';
                    //Errormsg.push(msg);
                    alert(msg);
                }
                else if (!customerUser) {
                    var msg = 'Customer User Can not be empty..';
                    alert(msg);
                }
                else if (!custUserCost) {
                    var msg = 'Customer Cost Can not be empty..';
                    alert(msg);
                }
                else if (!OthrUserCost) {
                    var msg = 'Othr User Cost Can not be empty..';
                    alert(msg);
                }
                else if (!EmployeeUser) {
                    var msg = 'Employee User Can not be empty..';
                    alert(msg);
                }
                else if (!VendorUser) {
                    var msg = 'Vendor User Can not be empty..';
                    alert(msg);
                }
                else if (!EmpUserCost) {
                    var msg = 'Employee User Cost Can not be empty..';
                    alert(msg);
                }
                else if (!EffectiveDate) {
                    var msg = 'Effective Date Can not be empty..';
                    alert(msg);
                }
                else if (!InfluencerUser) {
                    var msg = 'Influencer User Can not be empty..';
                    alert(msg);
                }                   
                else if (!OtherUser) {
                    var msg = 'Other User Can not be empty..';
                    alert(msg);
                }
                else if (!VendorUserCost) {
                    var msg = 'Vendor User Cost Can not be empty..';
                    alert(msg);
                }
                else {
                    $scope.dataParam.ModelName = modelName;
                    $scope.dataParam.CustomerUser = customerUser;
                    $scope.dataParam.CustUserCost = custUserCost;
                    $scope.dataParam.OthrUserCost = OthrUserCost;
                    $scope.dataParam.EmployeeUser = EmployeeUser;
                    $scope.dataParam.VendorUser = VendorUser;
                    $scope.dataParam.EmpUserCost = EmpUserCost;
                    $scope.dataParam.EffectiveDate = EffectiveDate;
                    $scope.dataParam.InfluencerUser = InfluencerUser;
                    $scope.dataParam.InfluencerCost = InfluencerCost;
                    $scope.dataParam.OtherUser = OtherUser;
                    $scope.dataParam.VendorUserCost = VendorUserCost;
                    $scope.dataParam.Active = 1;

                    var CustDAta1 = {};
                    CustDAta1.ModelId = 0;
                    CustDAta1.ModelName = modelName;
                    CustDAta1.EmployeeUser = EmployeeUser;
                    CustDAta1.CustomerUser = customerUser;
                    CustDAta1.InfluencerUser = InfluencerUser;
                    CustDAta1.VendorUser = VendorUser;
                    CustDAta1.OtherUser = OtherUser;
                    CustDAta1.EmpUserCost = EmpUserCost;
                    CustDAta1.CustUserCost = custUserCost;
                    CustDAta1.InfluencerCost = InfluencerCost;
                    CustDAta1.VendorUserCost = VendorUserCost;
                    CustDAta1.OthrUserCost = OthrUserCost;                                    
                    CustDAta1.EffectiveDate = EffectiveDate;                                                                              
                    CustDAta1.Active = $scope.dataParam.Active;
                    $scope.TempDAta.push(CustDAta1);

                    
                    $scope.clearSubscriptionData();
                   
                }
            }

            $scope.clearSubscriptionData = function () {
                $scope.txtModelName = '';
                $scope.txtCustomerUser = '';
                $scope.txtCustUserCost = '';
                $scope.txtOthrUserCost = '';
                $scope.txtEmployeeUser = '';
                $scope.txtVendorUser = '';
                $scope.txtEmpUserCost = '';
                $scope.txtEffectiveDate = '';
                $scope.txtInfluencerUser = '';
                $scope.txtInfluencerCost = '';
                $scope.txtOtherUser = '';
                $scope.txtVendorUserCost = '';               
            }

            $scope.removeRow = function (ModelName, EmployeeUser, CustomerUser) {
                //alert(ItemNos);
                //alert(BatchNames);
                var modelName = ModelName;
                var employeeUser = EmployeeUser;

                var index = -1;
                var comArr = eval($scope.TempDAta);
                for (var i = 0; i < comArr.length; i++) {
                    if (comArr[i].ModelName === modelName) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    alert("Something gone wrong");
                }
                $scope.TempDAta.splice(index, 1);
            };

            $scope.SubmitSubscriptionData = function () {

                var AllDAta1 = {};
                AllDAta1.UserId = $scope.dataParam.UserId;
                AllDAta1.SubscribeDAta = $scope.TempDAta;
                $scope.CustDAta.push(AllDAta1);
                    $scope.dataToPost = JSON.stringify($scope.CustDAta);
                    //console.log($scope.dataToPost);
                SubscibtionModelSrvc.GetSubscibtionModeldata($scope.dataToPost).then(function (result) {
                   
                    var statusCode = result;
                    if (statusCode == 200) {
                        $scope.CustDAta = [];
                        $scope.TempDAta = [];
                        $scope.Errorjs = 'd-none';
                        $scope.Errormsg = '';
                        $scope.Successjs = '';
                        $scope.Successmsg = 'Data Insert Successful';
                    }
                    else {                     
                        $scope.Successjs = 'd-none';
                        $scope.Successmsg = '';
                        $scope.Errorjs = '';
                        $scope.Errormsg = 'Data is not Insert';
                    }
                        //console.log($scope.ShopInfo);
                    });
            }

        }]);
})();