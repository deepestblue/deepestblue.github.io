$(function() {
  $("section h1, section h2, section h3").each(function() {
      if ($(this).text() === "") {
        return;
      }
      $("nav ul a:contains(" + $(this).text() + ")").html($(this).html());
  });
});
