<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Permissions", ["permissions" => Permission::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
            'description' => 'nullable|string',
        ]);
        $permission = \App\Models\Permission::create($validated);
        return response()->json(["permission" => $permission], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $permission = \App\Models\Permission::findOrFail($id);
        return response()->json(["permission" => $permission]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $permission = \App\Models\Permission::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:permissions,name,' . $permission->id,
            'description' => 'nullable|string',
        ]);
        $permission->update($validated);
        return response()->json(["permission" => $permission]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $permission = \App\Models\Permission::findOrFail($id);
        $permission->delete();
        return response()->json(["message" => "Permission deleted"]);
    }
}
