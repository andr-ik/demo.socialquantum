<?php
namespace api\controllers;

use common\models\People;
use yii\rest\ActiveController;

class PeopleController extends ActiveController
{
    public function init()
    {
        $this->modelClass = People::className();
        parent::init();
    }
}
