<?php
namespace api\controllers\base;

use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;

abstract class BaseActiveController extends ActiveController
{
    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'items',
        'linksEnvelope' => 'links',
        'metaEnvelope' => 'pagination',
    ];

    public function behaviors()
    {
        return ArrayHelper::merge(
            [
                'cors' => [
                    'class' => Cors::className(),
                ]
            ],
            parent::behaviors()
        );
    }
}
