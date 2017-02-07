<?php
namespace api\controllers;

use api\controllers\base\BaseActiveController;
use common\models\People;

class PeopleController extends BaseActiveController
{
    public function init()
    {
        $this->modelClass = People::className();
        parent::init();
    }
}
