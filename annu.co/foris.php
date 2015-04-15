<html>
<head>
<title>Forismatic</title>
</head>
<body>
<script type="text/javascript">
	$.getJSON( "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
</script>
</body>
</html>