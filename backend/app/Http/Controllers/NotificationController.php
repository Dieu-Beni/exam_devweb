<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id_user)
    {
        $notifications = Notification::where('id_user', $id_user)
                            ->orderBy('created_at', 'desc')
                            ->get();

        return response()->json([
            'message' => 'Notifications récupérées avec succès',
            'notifications' => $notifications
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'id_user' => 'required|exists:users,id',
        'message' => 'required|string'

        ]);

        $notification = Notification::create($request->all());
        return response()->json($notification, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json("Notification non trouvé", 404);
        }

        return response()->json($notification,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json("Notification non trouvé", 404);
        }

        $notification->update($request->all());
        return response()->json($notification,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json("Notification non trouvé", 404);
        }

        $notification->delete();
        return response()->json("Notification supprime avec succes.", 204);
    }
}
