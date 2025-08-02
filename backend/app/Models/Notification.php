<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Notification extends Model
{
    protected $fillable = ['id_user', 'message','titre'];

    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'id_user');
    }


}
