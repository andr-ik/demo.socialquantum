<?php
namespace api\controllers;

use api\controllers\base\BaseActiveController;
use common\models\Country;
use Yii;
use yii\data\ActiveDataProvider;

class CountryController extends BaseActiveController
{
    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = function(){
            return Yii::createObject([
                'class' => ActiveDataProvider::className(),
                'query' => Country::find(),
                'pagination' => [
                    'pageSize' => Country::find()->count(),
                ]
            ]);
        };

        return $actions;
    }

    public function init()
    {
        $this->modelClass = Country::className();
        parent::init();
    }
}
