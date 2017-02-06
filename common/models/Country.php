<?php

namespace common\models;

use common\models\query\CountryQuery;
use Yii;

/**
 * This is the model class for table "{{%country}}".
 *
 * @property integer $id
 * @property string $title
 * @property integer $vk_id
 * @property string $created_at
 * @property string $updated_at
 * @property integer $is_active
 *
 * @property People[] $peoples
 */
class Country extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%country}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'vk_id'], 'required'],
            [['vk_id', 'is_active'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['title'], 'string', 'max' => 255],
            [['title'], 'unique'],
            [['vk_id'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'vk_id' => 'Vk ID',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
            'is_active' => 'Is Active',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPeoples()
    {
        return $this->hasMany(People::className(), ['country_id' => 'id']);
    }

    /**
     * @inheritdoc
     * @return CountryQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new CountryQuery(get_called_class());
    }

    public function fields()
    {
        return [
            'id',
            'title'
        ];
    }
}
