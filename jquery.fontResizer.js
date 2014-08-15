/*! 
 * jquery.fontResizer - v 1.0
 * Copyright (c) 2014 Eder Lima - http://ederlima.com.br
 * License Attribution-ShareAlike 2.5 Generic (CC BY-SA 2.5) http://creativecommons.org/licenses/by-sa/2.5/
 */
// Created: 2014-08-15 
// Updated: 2014-08-15 
// REQUIRES: jquery 1.7.x

/*
 * Options
 * @readarea The text container (default this)
 * @incsteps Ammount of resizes (default 5)
 * @incsize Size to add or remove from each element (default 2) (pixel)
 * @smallerbutton jQuery element to decrease the size
 * @biggerbutton jQuery element to increase the size
 * @elements An array of elements (strings, eg: 'li', 'p') to resize within the container
 * @callback A callback function to call on each resize (good for scrolling plugins or functions)
*/

(function($)
	{
		$.fn.fontResizer = function(options)
		{
			//init config
			var data = {};
			//container of the text
			data.readarea = this;
			//increment steps
			data.incsteps = 5;
			//increment size
			data.incsize = 2;
			//element to set the font smaller
			data.smallerbutton = null;
			//element to set the font bigger
			data.biggerbutton = null;
			//array of elements that will change within the container
			data.elements = ['div', 'p', 'li', 'blockquote', 'cite', 'dd', 'dt', 'h1','h2','h3', 'h4', 'h5', 'h6', 'span', 'small', 'td', 'th'];
			//counter to steps
			data.inc = 0;
			//fontsize var
			data.fontsize = 0;
			//callback function on each font size action
			data.callback = null;
			//extending
			var config = $.extend(data,options); 
			//testing if the buttons are defined and send the error to console
			if(config.smallerbutton == null || config.biggerbutton == null)
			{
				if(config.smallerbutton == null)
				{
					console.log('\'smallerbutton\' must be defined.')
				}
				if(config.biggerbutton == null)
				{
					console.log('\'biggerbutton\' must be defined.')
				}
			}
			//if the buttons are defined
			else if(config.smallerbutton != null && config.biggerbutton !=null)
			{
				//attaches the click event to buttons
				config.smallerbutton.on('click', function(evt)
					{
						//cancels the default event # or link if exists
						evt.preventDefault();
						//sets the fontsize on each click passing the config object as parameter
						smallerFontSize(config);
					});
				config.biggerbutton.on('click', function(evt)
					{
						//cancels the default event # or link if exists
						evt.preventDefault();
						//sets the fontsize on each click passing the config object as parameter
						biggerFontSize(config);
					});
			}
			//helper functions
			//smaller fontsize
			var smallerFontSize = function(data)
			{
				//counts the steps
				if(data.inc>0)
				{
					data.inc--;
					//decreases the fontsize using the incsize on data (config) object
					data.fontsize = (-data.incsize);
					//sets the font size
					setFontSize(data);
				}
				
			}
			//bigger fontsize
			var biggerFontSize = function(data)
			{
				//counts the steps
				if(data.inc < data.incsteps)
				{
					data.inc++;
					//increases the fontsize using the incsize on data (config) object
					data.fontsize = (data.incsize);
					//sets the font size
					setFontSize(data);
				}
				
			}
			//changing fontsize on each element in array
			var setFontSize = function(data)
			{
				//test if the text container have text outside elements like p, li, td, etc
				if(data.readarea.find('p').length <=0 && data.readarea.find('div').length <=0 )
				{
					//if true, apply the resize to the parent element
					var fs = Number(String(data.readarea.css('fontSize')).split("px")[0]);
					data.readarea.css('fontSize', ((fs) + (data.fontsize)) + 'px');
					if(data.callback!=null)
					{
						//if a callback was assigned, calls
						data.callback();
					}
				}
				//or, if the text is placed inside child elements of the text container
				else
				{
					//loop trough the elements array
					for(var $i = 0; $i < data.elements.length; $i++)
					{
						//for each element as textcontainer (only one is recommended)
						data.readarea.each(function(){
								//creates an instance for the text container
								var ra = $(this);
								//find each element in array within de text container
								ra.find(data.elements[$i]).each(function(){
										//creates an instance for that
										var el = $(this);
										//works the fontsize in numbers
										var fs = Number(String(el.css('fontSize')).split("px")[0]);
										//apply the new font size
										el.css('fontSize', ((fs) + (data.fontsize)) + 'px');
									})
								//calls a callback functions, if exists
								if(data.callback!=null)
								{
									data.callback();
								}
							});
					}
				}
			}
			//returning the current element, the text container
			return this;
		}
	})(jQuery);

