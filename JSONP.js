/**
 * JSONP sets up and allows you to execute a JSONP request
 * @param {String} url  The URL you are requesting with the JSON data (you may include URL params)
 * @param {String} method  The method name for the callback function. Defaults to callback (for example, flickr's is "jsoncallback")
 * @param {Function} callback  The callback you want to execute as an anonymous function. The first parameter of the anonymous callback function is the JSON
 *
 * @example
 * JSONP('http://twitter.com/users/oscargodson.json',function(json){
 *  document.getElementById('avatar').innerHTML = '<p>Twitter Pic:</p><img src="'+json.profile_image_url+'">';
 * });
 *
 * @example
 * JSONP('http://api.flickr.com/services/feeds/photos_public.gne?id=12389944@N03&format=json','jsoncallback',function(json){
 *   document.getElementById('flickrPic').innerHTML = '<p>Flickr Pic:</p><img src="'+json.items[0].media.m+'">';
 * });
 */
(function( window, undefined) {
  var JSONP = function(url,method,callback){
    //Set the defaults
    url = url || '';
    method = method || '';
    callback = callback || function(){};
  
    //If no method was set and they used the callback param in place of
    //the method param instead, we say method is callback and set a
    //default method of "callback"
    if(typeof method == 'function'){
      callback = method;
      method = 'callback';
    }
  
    //This randomizes a function *name* for generated script tag at the bottom to call
    //example: jsonp958653
    var generatedFunction = 'jsonp'+Math.round(Math.random()*1000001)
  
    //Generate the temp JSONP function using the name above
    //First, call the function the user defined in the callback param [callback(json)]
    //Then delete the generated function from the window [delete window[generatedFunction]]
    window[generatedFunction] = function(json){
      callback(json);
      delete window[generatedFunction];
    };
  
    //Check if the user set their own params, and if not add a ? to start a list of params
    //If in fact they did we add a & to add onto the params
    //example1: url = http://url.com THEN http://url.com?callback=X
    //example2: url = http://url.com?example=param THEN http://url.com?example=param&callback=X
    if(url.indexOf('?') === -1){ url = url+'?'; }
    else{ url = url+'&'; }
  
    //This generates the <script> tag
    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute("src", url+method+'='+generatedFunction);
    document.getElementsByTagName("head")[0].appendChild(jsonpScript)
  }
  window.JSONP = JSONP;
})(window);