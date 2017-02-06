<?php

namespace console\migrations;

use yii\db\Migration as DefaultMigration;

class Migration extends DefaultMigration
{
    public $tableOptions = null;

    public function init()
    {
        if ($this->db->driverName === 'mysql') {
            $this->tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        parent::init();
    }
}