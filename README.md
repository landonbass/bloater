bloater
=======

a simple state driven object converter that returns new objects that contain subsets of properties based on states

it is useful when you want to temporarily denormalize data (perhaps for UI display)

##example
		//this is a denormalized object
		//perhaps an aggregation from a series of nosql calls
		var denormalizedObject = {
			firstName: 'Landon'
			, lastName: 'Bass'
			, jobId: 123
			, jobName: 'developer'
			, jobCompany: 'abc corp.'
		};
		
		//these are the 'states' (or views) that drive the returned object
		var toUIDisplay = {name: 'toUIDisplay', mapping:['firstName', 'lastName', 'jobId', 'jobName']},
			toDatabase = {name: 'toDatabase', mapping:['firstName', 'lastName', 'jobId']};
			
		bloater.clearStates()
				.set(denormalizedObject)
				.addState(toUIDisplay)
				.addState(toDatabase);
		
		var uiObject = bloater.get('toUIDisplay');
		/*
			{
				firstName: 'Landon'
				, lastName: 'Bass'
				, jobId: 123
				, jobName: 'developer'
			}
		*/
		
		var dbObject = bloater.get('toDatabase');
		/*
			{
				firstName: 'Landon'
				, lastName: 'Bass'
				, jobId: 123
			}
		*/
