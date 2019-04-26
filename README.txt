**************LAMBDA+ PROJECT: Chatbot/voicebot Insurance agent**********************
Install the used libraries with: 'npm install'
Run this project with: 'node app' instead of 'npm start'

The Main project structure:
	Controllers:
		AIAgentController: contains the logic behind the chatbot agent(intents/dialogue nodes & 				navigation), the integrated insurance functionalities and the training functions for the user admin.
		BillingController & payementMethodsController: contain the billing functions and the paypal logic.
		ChatController: contains the chat functions for the connected users.
		DossierInscriptionController: contains the policy functions
		InsuranceContractController: contains the insurance contract and subscription to the insurance coverage
		Prediction: contains the prediction logic for the appropriate insurance from the user data
		TextSpeechController: contains the text to speech functions
		userController: contains the user functions (registration & login)

	Routes: (api folder)
		chat: regroups the chatController functions
		claim: regroups the claimController functions and the AIAgentController functions
		users: regroups the userController functions
		...the other controllers' functions are directly integrated into the AIAgentController

	