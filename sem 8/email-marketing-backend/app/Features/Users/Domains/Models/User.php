<?php

namespace App\Features\Users\Domains\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Features\Users\Domains\Data\UpdateUserData;
use App\Features\Users\Domains\Data\UserData;
use App\Features\Users\Domains\Data\UserRoleAndEmailData;
use App\Features\Users\Domains\Enums\UserRoleEnum;
use App\Features\Users\Domains\Enums\UserStatusEnum;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @property string $organization_id
 */
class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'organization_id',
        'email',
        'password',
        'status',
        'role',
        'profile_image',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRoleEnum::class,
            'status' => UserStatusEnum::class
        ];
    }

    /**
     * Setting up uuids inside the booted method
     *
     * @return void
     */
    protected static function booted()
    {
        static::creating(function($user) {
            if(empty($user->id)) {
                $user->id = Str::uuid();
            }
        });
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }

    /**
     * User belongs to an Organization
     *
     * @return BelongsTo
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Function to get user by id
     *
     * @param string $id
     * @return self|null
     */
    public function findUserById(string $id): ?self
    {
        return $this->where('id', '=', $id)->first() ?? null;
    }

    /**
     * Function to get user by email
     *
     * @param string $email
     * @return self|null
     */
    public function findUserByEmail(string $email): ?self
    {
        return $this->where('email', '=', $email)->first() ?? null;
    }

    /**
     * Function to create user
     *
     * @param UserData $userData
     * @return self
     */
    public function createUser(UserData $userData): self
    {
        return $this->create($userData->toArray());
    }

    /**
     * Function to update user
     *
     * @param UpdateUserData|UserRoleAndEmailData $data
     * @return boolean
     */
    public function updateUser(UpdateUserData|UserRoleAndEmailData $data): bool
    {
        $dataToUpdate = array_filter($data->toArray(), fn($value) => $value != null && $value != '');
        return $this->update($dataToUpdate);
    }

    /**
     * Function to update password
     *
     * @param string $password
     * @return boolean
     */
    public function updatePassword(string $password): bool
    {
        return $this->update(['password' => $password]);
    }

    /**
     * Function to fetch all users
     *
     * @param string $organizationId
     * @param string $userId
     * @return Collection
     */
    public function getAllUsers(string $organizationId, string $userId): Collection
    {
        return $this->where('id', '!=', $userId)->where('organization_id', '=', $organizationId)->get();
    }
}
