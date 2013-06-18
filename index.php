<!DOCTYPE html>
<html>
    <head>
        <title>Kalendar</title>
        <script src="kalendar.js"></script>
    </head>
    <body>
        <script>
            var br = "<br>\r\n";
            var today = new Date();
            var tomorrow = today.advDays(1);
            var yesterday = today.revDays(1);
            var nextWeek = today.advWeeks(1);
            var lastWeek = today.revWeeks(1);
        </script>
    </body>
</html>