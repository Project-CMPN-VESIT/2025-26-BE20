<?php
namespace App\Features\EmailTemplates\Domains\Enums;
enum TemplateState:string
{
    case CURRENT= "current";
    case CREATE= "create";
    case STARTTING_POINT = "starting_point";
}