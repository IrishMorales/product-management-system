<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProduct extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // TODO: Flash validation rules on error
        return [
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            'stock' => 'required|integer|min:0',
            'price' => 'required|decimal:0,2|min:0',
        ];
    }
}
