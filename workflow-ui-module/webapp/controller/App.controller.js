sap.ui.define([
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/HTML"
], function (MessageToast, JSONModel, BaseController, HTML) {
  "use strict";

  return BaseController.extend("PurchaseOrderWorkflow.workflowuimodule.controller.App", {



    onInit: function () {
      // this._scrollContainer = this.byId("scrollContainer"); // Use the correct ID here
      // this._scrollContainer.addEventDelegate({
      //     onAfterRendering: function() {
      //         var oDomRef = this._scrollContainer.getDomRef();
      //         if (oDomRef) {
      //             oDomRef.addEventListener("scroll", this.onScroll.bind(this));
      //         }
      //     }.bind(this)
      // });

      var oUploadSet = this.byId("uploadSet");

      // Set the mode to 'None' to disable checkboxes
      oUploadSet.setMode("None");

      // Access the toolbar and modify its content
      var oUploadButton = sap.ui.getCore().byId("__component1---App--uploadSet-uploader-fu_button");
      if (oUploadButton) {
        oUploadButton.setVisible(false); // Hide the button


      }


    },

    onBeforeRendering: async function () {


      setTimeout(function () {
        var oView = this.getView();
        var oModel = new sap.ui.model.json.JSONModel();
        debugger;
        var oData = oView.oPropagatedProperties.oModels.context.oData;
        var SalesOrg = oData.salesOrg;

        var baseUrl1 = "https://44f10b5ftrial-dev1-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/SH";
        var filterUrl = baseUrl1 + `?$filter=sHId eq '${SalesOrg}'`;

        $.ajax({
          url: filterUrl,
          method: "GET",
          success: function (oData12) {
            var descri = oData12.value[0].sHDescription;
            oModel.setData({ SalesOrgDescription: descri });
            oView.setModel(oModel, "SalesModel");
            debugger
            console.log("SH Description:", descri);
            console.log(oView);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching data: " + textStatus + " " + errorThrown);
          },
        });
      }.bind(this), 1000);

      setTimeout(function () {
        var oView = this.getView();
        var oModel = new sap.ui.model.json.JSONModel();
        debugger;
        var oData = oView.oPropagatedProperties.oModels.context.oData;
        var districhannel = oData.distributionChannel;

        var baseUrl2 = "https://44f10b5ftrial-dev1-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/SH";
        var filterUrl1 = baseUrl2 + `?$filter=sHId2 eq '${districhannel}'  and sHField2 eq 'Distribution Channel'`;

        $.ajax({
          url: filterUrl1, 
          method: "GET",
          success: function (oData16) {
            var nutty = oData16.value[0].sHDescription2;
            oModel.setData({ Distribution: nutty });
            oView.setModel(oModel, "DistributionModel");
            debugger
            console.log("SH Description:", nutty);
            console.log(oView);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching data: " + textStatus + " " + errorThrown);
          },
        });
      }.bind(this), 1000);

      setTimeout(function () {
        var oView = this.getView();
        var oModel = new sap.ui.model.json.JSONModel();
        debugger;
        var oData = oView.oPropagatedProperties.oModels.context.oData;
        var divi = oData.division;

        var baseUrl3 = "https://44f10b5ftrial-dev1-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/SH";
        var filterUrl2 = baseUrl3 + `?$filter=sHId2 eq '${divi}' and sHField2 eq 'Division'`;

        $.ajax({
          url: filterUrl2,
          method: "GET",
          success: function (oData14) {
            var diving = oData14.value[0].sHDescription2;
            oModel.setData({ Divis: diving });
            oView.setModel(oModel, "DivisionModel");
            debugger
            console.log("SH Description:", diving);
            console.log(oView);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching data: " + textStatus + " " + errorThrown);
          },
        });
      }.bind(this), 1000);

      setTimeout(function () {
        var oView = this.getView();
        var oModel = new sap.ui.model.json.JSONModel();
        debugger;
        var oData = oView.oPropagatedProperties.oModels.context.oData;
        var docu = oData.documentType;

        var baseUrl4 = "https://44f10b5ftrial-dev1-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/SH";
        var filterUrl3 = baseUrl4 + `?$filter=sHId eq '${docu}' and sHField eq 'Document Type'`;


        $.ajax({
          url: filterUrl3,
          method: "GET",
          success: function (oData15) {
            var doctype = oData15.value[0].sHDescription;
            oModel.setData({ Documentty: doctype });
            oView.setModel(oModel, "DocumentModel");
            debugger
            console.log("SH Description:", doctype);
            console.log(oView);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching data: " + textStatus + " " + errorThrown);
          },
        });
      }.bind(this), 1000);





      // setTimeout(function () {
      //   debugger;
      //   var oView = this.getView();
      //   var oDat = oView.oPropagatedProperties.oModels.context.oData;
      //   var pdfDocumentValue = oDat.pdfDocument;
      //   // var baseUrl = "https://f2dbf934trial-hanapri-uni-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files"

      //   // Perform an AJAX call to get the PDF links
      //   $.ajax({
      //     // url: baseUrl,
      //     url: pdfDocumentValue,
      //     method: "GET",
      //     success: function (oData) {
      //       debugger;
      //       var oModel = new JSONModel();
      //       oModel.setData({ Files: oData.value }); // Assign the array directly
      //       oView.setModel(oModel, "myModel"); // Set the model with name "myModel"
      //     },
      //     error: function (jqXHR, textStatus, errorThrown) {
      //       console.error("Error in fetching data: " + textStatus + ': ' + errorThrown);
      //     }
      //   });
      //   // var oUploadSet = this.byId("uploadSet");
      // }.bind(this), 1000); // Ensure 'this' refers to the controller extension context

      setTimeout(function () {
        var oView = this.getView();
        var oModel2 = new sap.ui.model.json.JSONModel();
        debugger;
    
        var oData2 = oView.oPropagatedProperties.oModels.context.oData;
    
        // Check if filelink exists and is an array
        if (oData2.filelink && Array.isArray(oData2.filelink)) {
            const fileData = oData2.filelink;
    
            console.log(fileData); // Check if fileData contains the expected array
    
            // Set the full array to the model
            oModel2.setData({ Files: fileData });
    
            // Set the model to the view
            oView.setModel(oModel2, "myModel");
    
            console.log("Model set successfully:", oModel2.getData());
        } else {
            console.error("filelink is missing or not an array");
        }
    }.bind(this), 1000);

      // setTimeout(function () {
      //   debugger;
      //   var oView = this.getView();
      //   var oData1 = oView.oPropagatedProperties.oModels.context.oData;
      //   debugger
      //   var baseUrl1 = oData1.VechicleTable;
      //   console.log(oData1.VechicleTable);

      //   // Perform AJAX request to retrieve data
      //   $.ajax({
      //     url: baseUrl1,
      //     method: "GET",
      //     success: function (oData1) {
      //       console.log(oData1);
      //       var oModel = new sap.ui.model.json.JSONModel();
      //       oModel.setData({ Vehicle: oData1.value });
      //       debugger
      //       oView.setModel(oModel, "myVehicle");
      //       console.log(oView)
      //     },
      //     error: function (jqXHR, textStatus, errorThrown) {
      //       console.error(
      //         "Error fetching data: " + textStatus + " " + errorThrown
      //       );
      //     },
      //   });
      //   debugger
      // }.bind(this), 1000);


      setTimeout(async function () {
        debugger
        var oView = this.getView();
        
        debugger;
        var oData1 = oView.oPropagatedProperties.oModels.context.oData;
  
        if (!oData1) {
          console.warn("No data available in context.");
          return;
        }
  
        try {
          // Extract link data
          var baseUrl = JSON.parse(oData1.VechicleTable);
  
          // Prepare model for the base link data
          var oModel1 = new sap.ui.model.json.JSONModel();
          oModel1.setData({ Vehicle: baseUrl });
          oView.setModel(oModel1, "myVehicle");
  
          // If data is in array format, log the delivery lead time
        }
        catch (error) {
          console.error("Error during AJAX requests:", error);
        }
      }.bind(this), 1000);

      setTimeout(async function () {
        var oView = this.getView();
        var oModel11 = new sap.ui.model.json.JSONModel();
        debugger;
        var oData11 = oView.oPropagatedProperties.oModels.context.oData;
        //var id = oData11.pouuid;
    
        // Second AJAX call for comment history data
        //var purchaseOrderId = oData11.pouuid;

    // if (purchaseOrderId && typeof purchaseOrderId === "string") {
    //     purchaseOrderId = purchaseOrderId.replace(/['"]/g, '');
    //     debugger
    // } else {
    //     console.warn("purchaseOrderUuid is missing or not a string:", purchaseOrderId);
    // }

      
        //     // const baseUrlComments = "https://44f10b5ftrial-dev1-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";
        //     // const curl = baseUrlComments + `PurchaseOrder(purchaseOrderUuid=${purchaseOrderId},IsActiveEntity=true)/purchaseToComments?$orderby=createdAt asc`;
        //     debugger
    
            // try {
            //     const commentsData = await $.ajax({ url: curl, method: "GET" });
            //     const regex = /^\d{10}/; // Regex to filter out unwanted comments
            //     const filteredComments = commentsData
            //       .filter(comment => !regex.test(comment.commentsText))
            //       .map(function (oComment) {
            //         return `Comment: ${oComment.commentsText}\nCreated At: ${oComment.createdAt}\nCreated By: ${oComment.createdBy}`;
            //       });
            
            //     // Combine all comments into a single string
            //     const commentsText = filteredComments.join("\n\n");
            //     var oModelComments = new sap.ui.model.json.JSONModel();
            //     oModelComments.setData({ Comments: commentsText });
            //     oView.setModel(oModelComments, "myComments");
            //     console.log("Comments Data", commentsData);
    
            //     // Scroll to the latest comment after data is set
            //     oModelComments.attachEventOnce("change", function () {
            //         this._scrollToLatestComment();
            //     }.bind(this));
            // } catch (error) {
            //     console.error("Error fetching comments data", error);
            // }


            try {
              // Second AJAX call for comment history data
              debugger
              var commentsData = JSON.parse(oData11.comment);
              debugger
              if (commentsData) {
                // const baseUrlComments = "https://44f10b5ftrial-dev1-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";
                // const curl = baseUrlComments + `PurchaseOrder(purchaseOrderUuid=${purchaseOrderId},IsActiveEntity=true)/purchaseToComments?$orderby=createdAt asc`;
            
                // const commentsData = await $.ajax({ url: curl, method: "GET" });
                
                // Filter out comments that start with 10 digits
                const filteredComments = commentsData.filter(comment => !/^\d{10}/.test(comment.commentsText));
                debugger
                var oModelComments = new sap.ui.model.json.JSONModel();
                oModelComments.setData({ Comments: filteredComments });
                debugger
                oView.setModel(oModelComments, "myComments");
                console.log("Filtered Comments Data", filteredComments);
                
                // Scroll to the latest comment after data is set
                oModelComments.attachEventOnce("change", function () {
                  this._scrollToLatestComment();
                }.bind(this), 1000);
              } else {
                console.warn("PurchaseOrderUuid not available in base URL data.");
              }
            } catch (error) {
              console.error("Error during AJAX requests:", error);
            }
        
    
        debugger;
    }.bind(this), 1000);
  },    
     
    onOpenPressed: function (oEvent) {
      // Base URL for the OData service
      var baseUrl = "https://44f10b5ftrial-dev1-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";
      debugger
      
      
      // Get the current file URL from the event source
      let fileurl = oEvent.getSource().getUrl();
      
      // Regex pattern to match the "Files" part of the URL
      var pattern = /EnquiryFiles.*$/;
      debugger
      var match = fileurl.match(pattern);
      
      if (match) {
          // Construct the new entity URL
          var entityUrl = baseUrl + match[0];
          
          // Set the new URL back to the event source
          oEvent.getSource().setUrl(entityUrl);
      } else {
          console.warn("No match found in the URL pattern.");
      }
  },

    // 
    onBrowseHistoryPress: function () {
      debugger
      var oDialog = this.byId("commentHistoryDialog");
      var oScrollContainer = this.byId("scrollContainer");

      if (!oDialog) {
        this.loadFragment({
          name: "workflowmanagement.workflowuimodule.view.CommentHistoryDialog"
        }).then(function (oDialog) {
          oDialog.open();
          this._attachClickOutsideListener(oDialog); 

          // Ensure the Timeline scrolls to the bottom after the dialog is loaded
          this._scrollToLatestComment();
        }.bind(this));
      } else {
        oDialog.open();
        this._attachClickOutsideListener(oDialog);

        // Ensure the Timeline scrolls to the bottom when reopened
        this._scrollToLatestComment();
        debugger
      }
    },


    _scrollToLatestComment: function () {
      debugger
      var oScrollContainer = this.byId("scrollContainer");
      var oDomRef = oScrollContainer.getDomRef();
      debugger
      var height = oDomRef.scrollHeight;
      
      debugger
  
      if (oDomRef) {
        oScrollContainer.scrollTo(0, height, 0);
          // Delay ensures rendering is complete before scrolling
          // setTimeout(function () {
          //     oDomRef.scrollTop = oDomRef.scrollHeight; // Scroll to the bottom
          // },300); // Adjust delay time if necessary
      }
  },    
  onDialogOpen: function() {
    debugger
    this._scrollToLatestComment();
}, 

//     onCloseHistoryDialog: function () {
//       // Use the dialog's ID from the XML (_IDGenDialog)
//       var oDialog = this.byId("commentHistoryDialog");
//       if (oDialog) {
//         oDialog.close();
//       }
//       this._detachClickOutsideListener();
//     },

//     _attachClickOutsideListener: function (oDialog) {
//       var $dialog = oDialog.$(); // Get jQuery reference to dialog DOM element
//       var that = this;

//       this._outsideClickHandler = function (oEvent) {
//         if ($dialog && !$dialog[0].contains(oEvent.target)) {
//           that.onCloseHistoryDialog();
//         }
//       };

//       // Attach event listener for clicks outside the dialog
//       $(document).on("mousedown", this._outsideClickHandler);
//     },

//     _detachClickOutsideListener: function () {
//       // Remove the click outside event listener
//       if (this._outsideClickHandler) {
//         $(document).off("mousedown", this._outsideClickHandler);
//         this._outsideClickHandler = null;
//       }
//     },

//     onDialogOpen: function () {
//       this._scrollToLatestComment();
//     },

//     _scrollToLatestComment: function () {
//       var oScrollContainer = this.byId("scrollContainer");
//       if (oScrollContainer) {
//         var oDomRef = oScrollContainer.getDomRef();
//         if (oDomRef) {
//           var height = oDomRef.scrollHeight;
//           oScrollContainer.scrollTo(0, height, 0); // Scroll to the bottom
//         }
//       }
//     }
//   });
// });

onCloseHistoryDialog: function () {
  debugger
  var oDialog = this.byId("commentHistoryDialog");
  oDialog.close();
  this._detachClickOutsideListener();
},

_attachClickOutsideListener: function (oDialog) {
  var $dialog = oDialog.$(); // Get jQuery reference to dialog DOM element
  var that = this;

  this._outsideClickHandler = function (oEvent) {
    if (!$dialog[0].contains(oEvent.target)) {
      that.onCloseHistoryDialog();
    }
  };

  // Attach event listener for clicks outside the dialog
  $(document).on("mousedown", this._outsideClickHandler);
},

_detachClickOutsideListener: function () {
  // Remove the click outside event listener
  if (this._outsideClickHandler) {
    $(document).off("mousedown", this._outsideClickHandler);
    this._outsideClickHandler = null;
  }
},


onFilterTypeChange: function (oEvent) {
  // Logic for changing the filter in the timeline based on selection
  var sKey = oEvent.getSource().getSelectedKey();
  var oTimeline = this.byId("commentTimeline");
  oTimeline.setGroupBy(sKey);
},
onEscapeHandler: function (oPromise) {
  this.byId("commentHistoryDialog").close();
  oPromise.resolve();
},


  });
});

