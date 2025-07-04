<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title inertia>{{ config('app.name') }}</title>

  @viteReactRefresh
  @vite(['resources/css/app.css', 'resources/js/app.jsx'])

  @inertiaHead
</head>
<body class="antialiased">
  @inertia
</body>
</html>
